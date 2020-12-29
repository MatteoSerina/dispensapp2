import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StorageList from './StorageList';
import StorageFilter from './StorageFilter';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import * as config from '../../config';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
  list: {
    marginTop: '2em',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Storage() {
  const storageBaseUrl = config.storageBaseUrl(process.env.REACT_APP_API_URL);

  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [storage, setStorage] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchStorage = async () => {
    axios.get(storageBaseUrl).then(
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
    axios.put(config.storageBaseUrl(process.env.REACT_APP_API_URL).concat(good._id), {
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
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
        <Grid item xs={12}>
          <StorageFilter category={filter} onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12} className={classes.list}>
          <StorageList storage={storage} filter={filter} onUpdate={handleUpdate} />
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" variant='indeterminate' />
      </Backdrop>
    </div>
  );
}

export default Storage;