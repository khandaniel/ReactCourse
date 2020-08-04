import {v4 as uuidv4} from 'uuid';

export const newItemFromData = (data) => {
  const weight = (data.weight) ? data.weight : '0';
  return {
    id: uuidv4(),
    ...data,
    weight,
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

export const getGoodsBySelected = (
    goods,
    selectedIds,
    returnSelected = true,
) => {
  return goods.filter((item) => {
    const idx = selectedIds.indexOf(item.id);
    return (returnSelected) ? idx >= 0 : idx === -1;
  });
};

export const validateNumericInput = (input) => {
  return !isNaN(input);
};
