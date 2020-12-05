import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditGood from './EditGood';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 10,
    marginBottom: '1em',
    marginLeft: '1em',
    marginRight: '1em',
  },
});

const StorageCard = (props) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  function handleUpdate(good) {
    props.onUpdate(good);
  }
  
  function handleEdit(){
    setIsEditing(false);
  }

  return (
    <div>
      <Card className={classes.root} variant="outlined" onClick={() => { setIsEditing(!isEditing) }}>
        <CardContent>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <Typography variant="h5">
                {props.good.category.charAt(0).toUpperCase() + props.good.category.slice(1)}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h5" color={props.good.quantity < 1 ? "error" : "primary"}>
                {props.good.quantity}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <EditGood good={props.good} onUpdate={handleUpdate} enabled={isEditing} editComplete={handleEdit}/>
    </div>
  );
}

export default StorageCard;