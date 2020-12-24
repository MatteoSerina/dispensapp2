import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import StorageCard from './StorageCard';

const StorageList = (props) => {
  function handleUpdate(good) {
    props.onUpdate(good);
  }

  let items = [];
  props.storage.forEach((good) => {
    if (!props.filter) {
      items.push(
        <StorageCard good={good} onUpdate={handleUpdate} />
      )
    } else if (good.category.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1) {
      items.push(
        <StorageCard good={good} onUpdate={handleUpdate} />
      )
    }
  })
  return (
    <div>
      <Paper style={{ maxHeight: '80vmax', overflow: 'auto' }}>      
        {items}      
      </Paper>
    </div>
  );
}

export default StorageList;