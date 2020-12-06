import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StorageList from './StorageList';
import StorageFilter from './StorageFilter';
import axios from 'axios';
import secrets from '../../api.secrets';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
  list: {
    marginTop: '2em',
  }
}));

function Storage() {
  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [storage, setStorage] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchStorage = async () => {
    setLoading(true);
    axios.get(secrets.storageBaseUrl).then(
      (response) => {
        setStorage(response.data);
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {    
    fetchStorage();
  }, []);

  function handleFilter(filter) {
    setFilter(filter);
    let good = storage.find(function (e) {
      return e.category === filter
    })
  }

  function handleUpdate(good) {
    let currentGood = storage.find(function (e) {
      return e.category === good.category
    })
    const deltaQ = good.quantity - currentGood.quantity;
    setLoading(true);
    axios.put(secrets.storage.concat(good.category), {
      "delta": deltaQ
    }).then(
      (response) => {
        fetchStorage();
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.error(err);        
        alert(err);
        setLoading(false);
      }
    )

  };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
      <Grid item xs={12}>
        <StorageFilter category={filter} onFilter={handleFilter} />
      </Grid>
      <Grid item xs={12} className={classes.list}>
        <StorageList storage={storage} filter={filter} onUpdate={handleUpdate} />
      </Grid>
    </Grid>
  );
}

export default Storage;