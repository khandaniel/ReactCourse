import {newItemFromData} from '../../Utils/goodsUtils';

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item: newItemFromData(item),
  };
};
