import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, CardActions, Grid } from '@material-ui/core';
import axios from 'axios';
import secrets from '../../api.secrets';


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
  },
  media: {
    marginTop: 12,
    paddingTop: '100%',
    borderRadius: "4px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23)",
  },
});

const CatalogCard = (props) => {
  const classes = useStyles();
  const { category = '', barcode = '', itemsPerPackage = '', imageUrl = '' } = props.item || {};

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
            <TextField required fullWidth inputProps={{ style: { textTransform: 'capitalize' } }} label="Categoria" name="category" value={category} onChange={handleChange} />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <TextField required fullWidth label="Barcode" name="barcode" value={barcode} onChange={handleChange} />
          </Typography>
          <Typography variant="body2" component="p">
            <TextField required fullWidth label="Pacco da" name="itemsPerPackage" type="number" value={itemsPerPackage} onChange={handleChange} />
          </Typography>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary" className={classes.action} onClick={props.onSave}>Salva</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="secondary" className={classes.action} onClick={props.onDelete}>Elimina</Button>
              </Grid>
            </Grid>
          </CardActions>
          <div hidden={!imageUrl}>
            <CardMedia
              className={classes.media}
              image={imageUrl}
              title="Foto articolo"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CatalogCard;