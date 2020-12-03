import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StorageList from './StorageList';
import StorageFilter from './StorageFilter';

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
  const [storage, setStorage] = useState(STORAGE); //SOSTITUIRE CON CHIAMATA API

  function handleFilter(filter) {
    setFilter(filter);
    //TODO: FILTRARE STORAGE IN BASE A CATEGORY? FACCIO NELLA LIST
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

/*
In base alla categoria inserita nello StorageFilter, si aggiorna lo stato good
Con lo stato good aggiornato, chiamare API storage. Il risultato aggiorna lo stato item
*/
var STORAGE = [{"_id":"5fc01b8cdcd4e219b3c92657","category":"swiffer","quantity":5,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"carta igienica","quantity":6,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"detersivo bianchi","quantity":2,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"ammorbidente","quantity":1,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"detersivo scuri","quantity":0,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"acqua frizzante 0,5l","quantity":1,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"ricarica profumatore ambiente","quantity":3,"__v":0},{"_id":"5fc69bc3daa774ff833d2601","category":"brillantante","quantity":10,"__v":0}];
