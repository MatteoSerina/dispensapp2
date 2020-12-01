import React from 'react';
import StorageCard from './StorageCard';

const StorageList = (props) => {

  let items = [];
  props.storage.forEach((good) => {
    if (!props.filter) {
      items.push(
        <StorageCard good={good} />
      )
    } else if (good.category.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1) {
      items.push(
        <StorageCard good={good} />
      )
    }
  })
  return (
    <div>
      {items}
    </div>
  );
}

export default StorageList;