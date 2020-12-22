import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';
import BarcodeScanner from '../barcode/barcodeScanner';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import * as config from '../../config';
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
  const catalogBaseUrl = config.catalogBaseUrl(process.env.REACT_APP_API_URL);
  const storageBaseUrl = config.storageBaseUrl(process.env.REACT_APP_API_URL);
  
  const classes = useStyles();

  const [movement, setMovement] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [good, setGood] = useState({});
  const [barcode, setBarcode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  function movementSelector(movement) {
    setMovement(movement);
    setIsScanning(true);
  }

  function handleScan(barcode) {
    setIsScanning(false);
    setBarcode(barcode);
    if (movement === 'add') {
      addItem(barcode);
    }
    if (movement === 'remove') {
      removeItem(barcode);
    }
  }

  function addItem(barcode) {
    axios.get(catalogBaseUrl.concat(barcode)).then( //cerca good dato barcode
      (response) => {
        //item esiste, incrementa good quantity
        setGood(response.data);
        axios.put(storageBaseUrl.concat(response.data._id), {
          "delta": response.data.items[0].itemsPerPackage
        }).then(
          (response) => {
            console.log(response.data);
            message = `${good.category.charAt(0).toUpperCase() + good.category.slice(1)} aggiunto`;
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
    axios.get(catalogBaseUrl.concat(barcode)).then(
      (response) => {
        setGood(response.data);
        if (response.data.quantity < response.data.items[0].itemsPerPackage) {
          message = 'Operazione annullata per giacenza negativa';
          setShowErrorMessage(true);
        }
        const deltaValue = -1 * response.data.items[0].itemsPerPackage;
        axios.put(storageBaseUrl.concat(response.data._id), {
          "delta": deltaValue
        }).then(
          () => {
            message = `${good.category.charAt(0).toUpperCase() + good.category.slice(1)} rimosso`;
            setShowSuccessMessage(true);
          }
        ).catch((err) => { console.error(err) });
      }
    ).catch(
      (err) => {
        console.error(err)
        message = `Articolo non trovato`;
        setShowErrorMessage(true);
      }
    )
  }

  function handleSaveNewItem() {
    setIsCreating(false);
    axios.get(storageBaseUrl.concat(escape(good.category))).then(
      (response) => {
        if (response.data === null) {
          //Good non esiste, crea good
          axios.post(storageBaseUrl, {
            "category": good.category,
            "quantity": good.items[0].itemsPerPackage,
          }).then(
            (response) => {
              //Agguingi item
              axios.post(catalogBaseUrl.concat(escape(good.category)), {
                "itemsPerPackage": good.items[0].itemsPerPackage,
                "barcode": good.items[0].barcode
              }).then(
                () => {
                  message = `${good.category.charAt(0).toUpperCase() + good.category.slice(1)} aggiunto`;
                  setShowSuccessMessage(true);
                }
              ).catch((err) => { console.error(err) });
            }
          ).catch((err) => { console.error(err) });
        } else {
          //Good esiste, aggiungi item
          const storedGood = response.data;
          axios.post(catalogBaseUrl.concat(escape(storedGood.category)), {
            "itemsPerPackage": good.items[0].itemsPerPackage,
            "barcode": good.items[0].barcode
          }).then(
            (response) => {
              //Incrementa quantità good
              axios.put(storageBaseUrl.concat(storedGood._id), {
                "delta": good.items[0].itemsPerPackage
              }).then(
                () => {
                  message = `${good.category.charAt(0).toUpperCase() + good.category.slice(1)} aggiunto`;
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
          <AddItem onClick={() => { movementSelector('add') }} />
        </div>
        <div className={classes.itemButton}>
          <RemoveItem onClick={() => { movementSelector('remove') }} />
        </div>
      </div>
      <div hidden={!isScanning}>
        <BarcodeScanner onScan={handleScan} enableScanner={isScanning} />
      </div>
      <div hidden={!isCreating}>
        <CreateTemplate barcode={barcode} good={good} onSave={handleSaveNewItem} onCancel={handleAbortNewItem} onChange={handleNewItemChange} />
      </div>
      <div>
        <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={() => { setShowSuccessMessage(false) }}>
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