import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Box } from '@material-ui/core';
import BarcodeScanner from '../barcode/barcodeScanner';

const useStyles = makeStyles((theme) => ({
  filter: {
    '& > *': {
      width: '100%',
    },
  },
  barcodeInput: {
    height: '4em',
  },
  cameraButton: {
    height: '4em',
    marginRight: '1em',
  },
  cameraIcon: {
    fontSize: '3vmax',
  }
}));

const CatalogFilter = (props) => {
  const classes = useStyles();
  const [isScanning, setIsScanning] = useState(false);

  function handleChange(e) {
    props.onFilter(e.target.value);
  }

  function handleScan(data) {
    setIsScanning(false);    
    props.onFilter(data);
  }

  return (
    <div>
      <form className={classes.filter} noValidate autoComplete="off" hidden={isScanning}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <TextField className={classes.barcodeInput} name="barcode" label="Barcode" variant="outlined" fullWidth onChange={handleChange} value={props.barcode} />
          </Box>
          <Box p={1}>
            <Button className={classes.cameraButton} variant="contained" color="primary" onClick={() => { setIsScanning(true) }}>
              <PhotoCameraIcon className={classes.cameraIcon} />
            </Button>
          </Box>
        </Box>
      </form>
      <div hidden={!isScanning}>
        <BarcodeScanner onScan={handleScan} />
      </div>
    </div>
  );
}

export default CatalogFilter;