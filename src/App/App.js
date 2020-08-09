import React, { useState, useCallback } from 'react';
import './App.css';

import GoodsList from '../GoodsList/GoodsList';
import { goods as goodsMock } from '../Mocks/GoodsMock';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import { addNewItem, removeElementById, getTotal, getGoodsBySelected }
  from '../Utils/goodsUtils';
import { categories } from '../Mocks/CategoriesMock';
import __ from '../Utils/translationsUtils';

const App = () => {
  const [goods, setGoods] = useState(goodsMock);
  const [selectedGoods, setSelectedGoods] = useState([]);
  const [total, setTotal] = useState(getTotal(goods));
  const [subTotal, setSubTotal] = useState(0);

  const onAdd = useCallback((newElement) => {
    const newArray = addNewItem(newElement, goods);
    setGoods(newArray);
    setTotal(getTotal(newArray));
  }, [goods]);

  const onElementToggle = useCallback((id) => {
    const idx = selectedGoods.findIndex((itemId) => itemId === id);
    const shallowSelectedGoodsCopy = [...selectedGoods];

    if (idx >= 0) {
      shallowSelectedGoodsCopy.splice(idx, 1);
    } else {
      shallowSelectedGoodsCopy.push(id);
    }

    setSelectedGoods(shallowSelectedGoodsCopy);
    setSubTotal(getTotal(goods.filter((item) => {
      return shallowSelectedGoodsCopy.indexOf(item.id) >= 0;
    })));
  }, [selectedGoods, goods]);

  const onDelete = useCallback((id) => {
    const newArray = removeElementById(id, goods);
    if (selectedGoods.indexOf(id) >= 0) {
      onElementToggle(id);
    }

    setGoods(newArray);
    setTotal(getTotal(newArray));
  }, [goods, selectedGoods, onElementToggle]);

  const onElementUpdate = useCallback((id, data = {}) => {
    const idx = goods.findIndex((item) => item.id === id);
    const newGoods = [...goods];
    newGoods[idx] = {id, ...data};

    setGoods(newGoods);
    setTotal(getTotal(newGoods));
    setSubTotal(getTotal(getGoodsBySelected(newGoods, selectedGoods)));
  }, [goods, selectedGoods]);

  const onDeleteSelected = useCallback(() => {
    const deselectedGoods = getGoodsBySelected(goods, selectedGoods, false);

    setGoods(deselectedGoods);
    setSelectedGoods([]);
    setSubTotal(0);
    setTotal(getTotal(deselectedGoods));
  }, [goods, selectedGoods]);

  return (
    <div className="Container">
      <div className="Title">{ __('Fridge') }</div>
      <GoodsList
        goods={ goods }
        categories={ categories }
        selectedItems={ selectedGoods }
        onDelete={ onDelete }
        onElementToggle={ onElementToggle }
        onElementUpdate={ onElementUpdate }
      />
      <div className="Total">
        <div>{__('Total')}:</div>
        <div>{total}</div>
        <div>{
          selectedGoods.length > 0 && `${ __('SubTotal') }: ${subTotal}`
        }</div>
      </div>
      { !!selectedGoods.length && (
        <button onClick={ onDeleteSelected }>
          { __('Delete Selected') }
        </button>
      ) }
      <GoodsListForm onAdd={ onAdd } categories={ categories } />
    </div>
  );
};

export default App;
