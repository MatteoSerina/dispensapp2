import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatalogFilter from './CatalogFilter';
import CatalogCard from './CatalogCard';
import axios from 'axios';
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
      axios.get("http://192.168.42.226:3100/api/catalog").then(
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

  return (
    <div>      
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        <Grid item xs={12}>
          <CatalogFilter barcode={barcode} onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12}>
          <CatalogCard item={item} barcode={barcode} onChange={handleChange} />
        </Grid>
      </Grid>      
    </div>
  );
}

export default Catalog;

/*
In base al barcode inserito nel CatalogFilter, si aggiorna lo stato barcode
Con lo stato barcode aggiornato, chiamare API catalog/barcode. Il risultato aggiorna lo stato item
*/
//var CATALOG = [{"itemsPerPackage":18,"_id":"5fc01dc8f9190a1b9a12e57a","barcode":"bc123456","category":"carta igienica","__v":0},{"itemsPerPackage":5,"_id":"5fc38dc2daa774ff833d25ff","barcode":"abc456123","category":"swiffer","__v":0},{"itemsPerPackage":1,"_id":"5fc93901daa774ff833d2602","barcode":"5000394023352","category":"batteria a27","__v":0}];
