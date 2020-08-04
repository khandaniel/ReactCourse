import {v4 as uuidv4} from 'uuid';

export const newItemFromData = (data) => {
  return {
    id: uuidv4(),
    ...data,
  };
};

export const addNewItem = (data, goods) => {
  return [...goods, newItemFromData(data)];
};

export const removeElementById = (id, goods) => {
  return goods.filter((e) => e.id !== id);
};

export const getTotal = (goods) => {
  return goods.reduce((acc, item) => {
    return acc + parseFloat(item.weight);
  }, 0);
};

export const getGoodsBySelected = (goods, selectedIds, returnSelected = true) => {
  return goods.filter((item) => {
    if (returnSelected) {
      return selectedIds.indexOf(item.id) >= 0;
    } else {
      return selectedIds.indexOf(item.id) === -1;
    }
  });
};
