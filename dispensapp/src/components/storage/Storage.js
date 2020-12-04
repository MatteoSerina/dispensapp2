import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StorageList from './StorageList';
import StorageFilter from './StorageFilter';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
  list:{
    marginTop: '2em',
  }
}));

function Storage() {    
  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [storage, setStorage] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStorage = async () => {
      setLoading(true);
      axios.get("http://localhost:3100/api/storage").then(
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
    fetchStorage();
  }, []);

  function handleFilter(filter) {
    setFilter(filter);
    let good = storage.find(function (e) {
      return e.category === filter
    })
  }
  
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.container}>
      <Grid item xs={12}>
        <StorageFilter category={filter} onFilter={handleFilter} />
      </Grid>
      <Grid item xs={12} className={classes.list}>
        <StorageList storage={storage} filter={filter}/>
      </Grid>
    </Grid>
  );
}

export default Storage;