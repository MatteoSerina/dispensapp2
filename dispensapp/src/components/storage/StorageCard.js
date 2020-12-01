import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    props.onChange({
      [name]: value
    });
  };


  return (
    <div>
      <Card className={classes.root} variant="outlined" onClick={() => { alert(`Item details: ${props.good.category}`) }}>
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
    </div>
  );
}

export default StorageCard;