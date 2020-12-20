import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogCard from './CatalogCard';

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
  

  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        {/* <Grid item xs={12}>
          <TextField className={classes.barcodeInput} name="barcode" label="Barcode" variant="outlined" fullWidth onChange={handleChange} value={props.barcode} />
        </Grid> */}
        <Grid item xs={12}>
          <CatalogCard item={props.good} onChange={props.onChange} onSave={props.onSave} onCancel={props.onCancel} isCreate />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateTemplate;