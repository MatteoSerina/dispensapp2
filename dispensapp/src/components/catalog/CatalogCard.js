import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, CardActions } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
  },
  notFound: {
    marginTop: '2em',
    color: 'red',
  },
  action: {
    marginTop: '1em',
  }
});

const CatalogCard = (props) => {
  const classes = useStyles();

  const { category = '', barcode = '', itemsPerPackage = '' } = props.item || {};

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    props.onChange({
      [name]: value
    });
  };


  return (
    <div>
      <Typography variant="h3" component="h2" align="center" className={classes.notFound} hidden={props.item || !props.barcode}>
        Articolo non trovato
      </Typography>
      <Card className={classes.root} hidden={!props.item}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Articolo
        </Typography>
          <Typography variant="h5" component="h2">
            <TextField required inputProps={{ style: { textTransform: 'capitalize' } }} label="Categoria" name="category" value={category} onChange={handleChange} />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <TextField required label="Barcode" name="barcode" value={barcode} onChange={handleChange} />
          </Typography>
          <Typography variant="body2" component="p">
            <TextField required label="Pacco da" name="itemsPerPackage" type="number" value={itemsPerPackage} onChange={handleChange} />
          </Typography>
          <CardActions>
            <Button variant="contained" color="primary" className={classes.action} onClick={() => { alert("Articolo salvato") }}>Salva</Button>
            <Button variant="contained" color="secondary" className={classes.action} onClick={() => { alert("Articolo eliminato") }}>Elimina</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default CatalogCard;