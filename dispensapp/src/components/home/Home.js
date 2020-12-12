import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';
import BarcodeScanner from '../barcode/barcodeScanner';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import secrets from '../../api.secrets';
import CreateTemplate from '../catalog/CreateTemplate';

const useStyles = makeStyles({
  itemButton: {
    marginTop: '5vh',
    marginLeft: "10vh",
    marginRight: "10vh",
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var message = '';

function Home() {
  const classes = useStyles();

  const [isScanning, setIsScanning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [good, setGood] = useState({});
  const [barcode, setBarcode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  function mockScan(data) {
    // const barcode = '5000394023352';
    const barcode = '123';
    //addItem(barcode);
    removeItem(barcode);
  }

  function startScan(data) {
    setIsScanning(true);
    //props.onFilter(data);
  }

  function addItem(barcode) {
    setIsScanning(false);
    setBarcode(barcode);
    axios.get(secrets.catalogBaseUrl.concat(barcode)).then( //cerca good dato barcode
      (response) => {
        //item esiste, incrementa good quantity
        setGood(response.data);
        axios.put(secrets.storageBaseUrl.concat(response.data._id), {
          "delta": response.data.items[0].itemsPerPackage
        }).then(
          (response) => {
            console.log(response.data);
            message = 'Articolo aggiunto';
            setShowSuccessMessage(true);
          }
        ).catch(
          (err) => {
            console.error(err);
          }
        )
      }
    ).catch(
      (err) => {
        console.log(err);
        //good non esiste, crea good con qty = item.itemsPerPackage + item
        setGood({
          "category": "",
          "quantity": 0,
          "items": [
            {
              "itemsPerPackage": 0,
              "barcode": barcode,
            }
          ]
        });
        setIsCreating(true);
      }
    )
  }

  function removeItem(barcode) {
    setIsScanning(false);
    setBarcode(barcode);
    axios.get(secrets.catalogBaseUrl.concat(barcode)).then(
      (response) => {
        if (response.data.quantity < response.data.items[0].itemsPerPackage) {
          message = 'Operazione annullata per giacenza negativa';
          setShowErrorMessage(true);
        }
        const deltaValue = -1 * response.data.items[0].itemsPerPackage;
        axios.put(secrets.storageBaseUrl.concat(response.data._id), {
          "delta": deltaValue
        }).then(
          () => {
            message = 'Articolo rimosso';
            setShowSuccessMessage(true);
          }
        ).catch((err) => { console.error(err) });
      }
    ).catch(
      (err) => {
        console.error(err)
        alert('Articolo non trovato');
      }
    )
  }

  function handleSaveNewItem() {
    setIsCreating(false);
    axios.get(secrets.storageBaseUrl.concat(escape(good.category))).then(
      (response) => {
        if (response.data === null) {
          //Good non esiste, crea good
          axios.post(secrets.storageBaseUrl, {
            "category": good.category,
            "quantity": good.items[0].itemsPerPackage,
          }).then(
            (response) => {
              //Agguingi item
              axios.post(secrets.catalogBaseUrl.concat(escape(good.category)), {
                "itemsPerPackage": good.items[0].itemsPerPackage,
                "barcode": good.items[0].barcode
              }).then(
                () => {
                  message = 'Articolo aggiunto';
                  setShowSuccessMessage(true);
                }
              ).catch((err) => { console.error(err) });
            }
          ).catch((err) => { console.error(err) });
        } else {
          //Good esiste, aggiungi item
          const storedGood = response.data;
          axios.post(secrets.catalogBaseUrl.concat(escape(storedGood.category)), {
            "itemsPerPackage": good.items[0].itemsPerPackage,
            "barcode": good.items[0].barcode
          }).then(
            (response) => {
              //Incrementa quantità good
              axios.put(secrets.storageBaseUrl.concat(storedGood._id), {
                "delta": good.items[0].itemsPerPackage
              }).then(
                () => {
                  message = 'Articolo aggiunto';
                  setShowSuccessMessage(true);
                }
              ).catch((err) => { console.log(err) });
            }
          ).catch((err) => { console.error(err) });
        }
      }
    ).catch((err) => { console.error(err) });
  }

  function handleNewItemChange(changedProp) {
    if (changedProp.barcode !== undefined) {
      let newGood = JSON.parse(JSON.stringify(good));
      let newItems = [...newGood.items];
      newGood.items[0] = { ...newItems[0], barcode: changedProp.barcode };
      setGood(newGood);
    } else if (changedProp.itemsPerPackage !== undefined) {
      let newGood = JSON.parse(JSON.stringify(good));
      let newItems = [...newGood.items];
      newGood.items[0] = { ...newItems[0], itemsPerPackage: changedProp.itemsPerPackage };
      setGood(newGood);
    } else {
      setGood(good => {
        // Object.assign would also work
        return { ...good, ...changedProp };
      })
    }
  }

  function handleAbortNewItem() {
    setIsCreating(false);
  }

  return (
    <div>
      <div hidden={isScanning || isCreating}>
        <div className={classes.itemButton}>
          <AddItem onClick={mockScan} />
        </div>
        <div className={classes.itemButton}>
          <RemoveItem onClick={mockScan} />
        </div>
      </div>
      <div hidden={!isScanning}>
        <BarcodeScanner onScan={addItem} enableScanner={isScanning} />
      </div>
      <div hidden={!isCreating}>
        <CreateTemplate barcode={barcode} good={good} onSave={handleSaveNewItem} onCancel={handleAbortNewItem} onChange={handleNewItemChange} />
      </div>
      <div>
        <Snackbar open={showSuccessMessage} autoHideDuration={1000} onClose={() => { setShowSuccessMessage(false) }}>
          <Alert onClose={() => { setShowSuccessMessage(false) }} severity="success">
            {message}
          </Alert>
        </Snackbar>
        <Snackbar open={showErrorMessage} autoHideDuration={2000} onClose={() => { setShowErrorMessage(false) }}>
          <Alert onClose={() => { setShowErrorMessage(false) }} severity="error">
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Home;