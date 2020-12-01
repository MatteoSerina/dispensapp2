import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  filter: {
    '& > *': {
      width: '100%',
    },
  },
  categoryInput: {
    width: '90%',
    height: '4em',
    marginLeft: '1em',
  },
  cameraButton: {
    width: '90%',
    height: '4em',
    marginRight: '1em',
  },
  cameraIcon:{
    fontSize: '3vmax',
  }
}));

const StorageFilter = (props) => {
  const classes = useStyles();

  function handleChange(e) {
    props.onFilter(e.target.value);
}

  return (
      <form className={classes.filter} noValidate autoComplete="off">
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item sm={6}>
            <TextField className={classes.categoryInput} name="category" label="Categoria" variant="outlined" fullWidth onChange={handleChange} value={props.category}/>
          </Grid>
          <Grid item sm={6}>
            <Button className={classes.cameraButton} variant="contained" color="primary" onClick={() => { alert("Take picture") }}>
              <PhotoCameraIcon className={classes.cameraIcon} />
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}

export default StorageFilter;