import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogFilter from './CatalogFilter';
import CatalogCard from './CatalogCard';
import axios from 'axios';
import secrets from '../../api.secrets';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
}));

function Catalog() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [barcode, setBarcode] = useState('');
  const history = useHistory()

  function handleFilter(barcode) {
    setBarcode(barcode);
    axios.get(secrets.catalogBaseUrl.concat(barcode)).then(
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
    axios.put(secrets.catalogBaseUrl.concat(item.items[0].barcode), {
      "itemsPerPackage": item.items[0].itemsPerPackage,
      "barcode": item.items[0].barcode
    }).then(
      (response) => {
        alert('Articolo salvato');
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };

  function handleDelete() {
    setLoading(true);
    axios.delete(secrets.catalogBaseUrl.concat(item.items[0].barcode)).then(
      (response) => {
        history.push('/');
        alert('Articolo eliminato');
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.error(err);
        setLoading(false);
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
          <CatalogCard item={item} barcode={barcode} onChange={handleChange} onSave={handleSave} onDelete={handleDelete} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Catalog;