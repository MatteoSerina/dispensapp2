import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';
import BarcodeScanner from '../barcode/barcodeScanner';
import { Button } from '@material-ui/core';
import axios from 'axios';
import secrets from '../../api.secrets';
import CreateTemplate from '../catalog/CreateTemplate';

const useStyles = makeStyles({
  itemButton: {
    marginLeft: "10vh",
    marginRight: "10vh",
  }
});

function Home() {
  const classes = useStyles();

  const [isScanning, setIsScanning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [barcode, setBarcode] = useState('');
  let baseItem = {
    "itemsPerPackage": 0,
    "category": '',
    "barcode": barcode
  };

  function mockScan(data) {
    // const barcode = '5000394023352';
    const barcode = '123';
    stopScan(barcode);
  }

  function startScan(data) {
    setIsScanning(true);
    //props.onFilter(data);
  }

  function stopScan(barcode) {
    setIsScanning(false);
    setBarcode(barcode);
    axios.get(secrets.catalogBaseUrl.concat(barcode)).then( //cerca template dato barcode
      (response) => {
        //template esiste, aggiorna storage
        const template = response.data;
        axios.get(secrets.storageBaseUrl.concat(template.category)).then( //cerca good data category
          (response) =>{
            //good esiste, incrementa quantity
            const good = response.data;
            axios.put(secrets.storageBaseUrl.concat(good._id), {
              "delta": template.itemsPerPackage
            }).then(
              (response) => {
                // alert(`${template.category} + ${template.itemsPerPackage}`);
                console.log(response);
              }
            ).catch(
              (err) => {                
                console.error(err);
              }
            )
          }
        ).catch(
          (err) => {
            //good non esiste, crea good con qty = template.itemsPerPackage
            console.log(err);
            console.log(template)
            const good = {
              "category": template.category,
              "quantity": template.itemsPerPackage,
            };
            axios.post(secrets.storageBaseUrl, good).then(
              (response) => {
                console.log(response);
              }
            ).catch(
              (err) => {
                console.error(err);
              }
            );
          }
        )
        }        
    ).catch(
      (err) => {
        //template non esiste, crea template
        console.log(err);
        baseItem.barcode = barcode;
        setIsCreating(true);
      }
    )
  }

  function handleSaveNewTemplate(template) {
    setIsCreating(false);
    axios.get(secrets.storageBaseUrl.concat(template.category)).then(
      (response) => {
        console.log(response)
        axios.put(secrets.storageBaseUrl.concat(response.data._id), {
          "delta": template.itemsPerPackage
        }).then(
          (response) => {
            // alert(`${template.category} + ${template.itemsPerPackage}`);
            console.log(response);
          }
        ).catch(
          (err) => {
            console.error(err);
          }
        )
      }
    ).catch(
      (err) => {
        const good = {
          "category": template.category,
          "quantity": template.itemsPerPackage,
        };
        axios.post(secrets.storageBaseUrl, good).then(
          (response) => {
            console.log(response);
          }
        ).catch(
          (err) => {
            console.error(err);
          }
        );
      }
    )
  }

  function handleAbortNewTemplate() {
    setIsCreating(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.itemButton} onClick={() => { setIsScanning(false); setIsCreating(false) }}>Stop scanning</Button>
      <div hidden={isScanning || isCreating}>
        <div className={classes.itemButton}>
          <AddItem onClick={mockScan} />
        </div>
        <div className={classes.itemButton}>
          <RemoveItem />
        </div>
      </div>
      <div hidden={!isScanning}>
        <BarcodeScanner onScan={stopScan} enableScanner={isScanning} />
      </div>
      <div hidden={!isCreating}>
        <CreateTemplate barcode={barcode} item={baseItem} onSave={handleSaveNewTemplate} onCancel={handleAbortNewTemplate} />
      </div>
    </div>
  );
}

export default Home;