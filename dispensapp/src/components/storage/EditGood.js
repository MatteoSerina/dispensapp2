import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    marginLeft: '1em',
    marginRight: '1em',
    flexGrow: 1,
  },
  action: {
    marginTop: '1em',
  }
});

const EditGood = (props) => {
  const classes = useStyles();
  
  const[good, setGood] = useState(JSON.parse(JSON.stringify(props.good)));

  function handleChange(event) {
    setGood(prevGood => ({
      ...prevGood,
      quantity: event.target.value
    }))
  };

  function handleSave() {
    props.onUpdate(good);
    props.editComplete();
  }

  function handleCancel() {
    props.editComplete();
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" hidden={!props.enabled}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <TextField required inputProps={{ style: { textTransform: 'capitalize' } }} fullWidth label="Categoria" name="category" defaultValue={good.category} filled onChange={handleChange} />
        </Grid> */}
        <Grid item xs={12}>
          <TextField required name="quantity" label="Quantità" type="number" fullWidth value={good.quantity} onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" className={classes.action} onClick={handleSave}>Salva</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="secondary" className={classes.action} onClick={handleCancel}>Annulla</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditGood;