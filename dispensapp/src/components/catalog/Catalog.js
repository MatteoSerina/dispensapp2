import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogFilter from './CatalogFilter';
import CatalogCard from './CatalogCard';
import axios from 'axios';
import secrets from '../../api.secrets';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
}));

function Catalog() {
  const classes = useStyles();
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      axios.get(secrets.catalogBaseUrl).then(
        (response) => {
          setCatalog(response.data);
          setLoading(false);
        }
      ).catch(
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    };
    fetchCatalog();
  }, []);

  function handleFilter(barcode) {
    setBarcode(barcode);
    let item = catalog.find(function (e) {
      return e.barcode === barcode
    })
    setItem(item);
  }

  function handleChange(changedProp) {
    setItem(item => {
      // Object.assign would also work
      return { ...item, ...changedProp };
    })
  };

  function handleSave(){
    setLoading(true);
    axios.put(secrets.catalogBaseUrl.concat(item._id), item).then(
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

  function handleDelete(){

    alert('Articolo eliminato');
  }

  return (
    <div>      
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        <Grid item xs={12}>
          <CatalogFilter barcode={barcode} onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12}>
          <CatalogCard item={item} barcode={barcode} onChange={handleChange} onSave={handleSave} onDelete={handleDelete}/>
        </Grid>
      </Grid>      
    </div>
  );
}

export default Catalog;