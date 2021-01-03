import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogFilter from './CatalogFilter';
import CatalogCard from './CatalogCard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import * as config from '../../config';
import { useHistory } from 'react-router-dom'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var message = '';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
}));


function Catalog(props) {
  const catalogBaseUrl = config.catalogBaseUrl(process.env.REACT_APP_API_URL);
  axios.defaults.headers.common = { 'Authorization': `Bearer ${props.auth.token}` }

  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [item, setItem] = useState();
  const [barcode, setBarcode] = useState('');
  const history = useHistory()

  function handleFilter(barcode) {
    setBarcode(barcode);
    axios.get(catalogBaseUrl.concat(barcode)).then(
      (response) => {
        setItem(response.data);
      }
    ).catch(
      (err) => {
        setItem(null); //not found
      }
    )
  }

  function handleChange(changedProp) {
    if (changedProp.barcode !== undefined) {
      let newItem = JSON.parse(JSON.stringify(item));
      let newItems = [...newItem.items];
      newItem.items[0] = { ...newItems[0], barcode: changedProp.barcode };
      setItem(newItem);
    } else if (changedProp.itemsPerPackage !== undefined) {
      let newItem = JSON.parse(JSON.stringify(item));
      let newItems = [...newItem.items];
      newItem.items[0] = { ...newItems[0], itemsPerPackage: changedProp.itemsPerPackage };
      setItem(newItem);
    } else {
      setItem(item => {
        // Object.assign would also work
        return { ...item, ...changedProp };
      })
    }
  };

  function handleSave() {
    console.log(item)
    axios.put(catalogBaseUrl.concat(item.items[0].barcode), {
      "itemsPerPackage": item.items[0].itemsPerPackage,
      "barcode": item.items[0].barcode
    }).then(
      (response) => {
        setLoading(false);
        message = `Articolo salvato`;
        setShowSuccessMessage(true);
      }
    ).catch(
      (err) => {
        setLoading(false);
        console.error(err);
        message = `Errore durante il salvataggio`;
        setShowErrorMessage(true);
      }
    );
  };

  function handleDelete() {
    setLoading(true);
    axios.delete(catalogBaseUrl.concat(item.items[0].barcode)).then(
      (response) => {
        setLoading(false);
        message = `Articolo eliminato`;
        setShowSuccessMessage(true);
        setTimeout(() => { history.push('/'); }, 2000);
      }
    ).catch(
      (err) => {
        setLoading(false);
        console.error(err);
        message = `Errore durante l'eliminazione`;
        setShowErrorMessage(true);
      }
    );
  }

  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        <Grid item xs={12}>
          <CatalogFilter barcode={barcode} onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12}>
          <CatalogCard item={item} barcode={barcode} auth={props.auth} onChange={handleChange} onSave={handleSave} onDelete={handleDelete} />
        </Grid>
      </Grid>
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

export default Catalog;