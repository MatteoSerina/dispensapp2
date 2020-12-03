import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';

const useStyles = makeStyles({
  itemButton:{
    marginLeft: "10vh",
    marginRight: "10vh",
    marginTop: "5vh",
  }
});

function Home() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.itemButton}>
        <AddItem />
      </div>
      <div className={classes.itemButton}>
        <RemoveItem />
      </div>
    </div>
  );
}

export default Home;