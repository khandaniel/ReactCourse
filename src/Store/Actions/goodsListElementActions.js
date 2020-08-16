export const setItemSelected = (id) => {
  return {
    type: 'SET_ITEM_SELECTED',
    itemId: id,
  };
};

export const unsetItemSelected = (id) => {
  return {
    type: 'UNSET_ITEM_SELECTED',
    itemId: id,
  };
};

export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    itemId: id,
  };
};

export const updateItem = (id, item = {}) => {
  return {
    type: 'UPDATE_ITEM',
    itemId: id,
    item,
  };
};

export const deleteSelected = () => ({ type: 'DELETE_SELECTED' });
