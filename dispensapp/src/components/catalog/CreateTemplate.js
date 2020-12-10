import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogCard from './CatalogCard';
import axios from 'axios';
import secrets from '../../api.secrets';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
    marginLeft: '1em',
    paddingRight: '2em',
  },
  barcodeInput: {
    height: '4em',
  },
}));

const CreateTemplate = (props) => {
  const classes = useStyles();
  const [barcode, setBarcode] = useState(props.barcode);
  const [item, setItem] = useState(props.item); 

  function handleChange(changedProp) {
    setItem(item => {
      // Object.assign would also work
      return { ...item, ...changedProp };
    })
  };

  function handleSave() {
    axios.post(secrets.catalogBaseUrl, item).then(
      (response) => {
        props.onSave(item);
      }
    ).catch(
      (err) => {
        alert(err);
        console.log(err);
      }
    )
  };

  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        {/* <Grid item xs={12}>
          <TextField className={classes.barcodeInput} name="barcode" label="Barcode" variant="outlined" fullWidth onChange={handleChange} value={props.barcode} />
        </Grid> */}
        <Grid item xs={12}>
          <CatalogCard item={item} barcode={barcode} onChange={handleChange} onSave={handleSave} onCancel={props.onCancel} isCreate />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateTemplate;