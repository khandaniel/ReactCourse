import React, { Component } from 'react';
import './App.css';

import GoodsList from '../GoodsList/GoodsList';
import { goods } from '../Mocks/GoodsMock';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import { addNewItem, removeElementById, getTotal, getGoodsBySelected }
  from '../Utils/goodsUtils';
import {categories} from '../Mocks/CategoriesMock';
import __ from '../Utils/translationsUtils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods,
      selectedGoods: [],
      total: getTotal(goods),
      subTotal: 0,
    };

    this.onAdd = (newElement) => {
      this.setState(({goods}) => {
        const newArray = addNewItem(newElement, goods);
        return {
          goods: newArray,
          total: getTotal(newArray),
        };
      });
    };

    this.onDelete = (id) => {
      const newArray = removeElementById(id, this.state.goods);
      this.setState({
        goods: newArray,
        total: getTotal(newArray),
      });
    };

    this.onElementToggle = (id) => {
      this.setState(({ goods, selectedGoods }) => {
        const idx = selectedGoods.findIndex((itemId) => itemId === id);
        const shallowSelectedGoodsCopy = [...selectedGoods];

        if (idx >= 0) {
          shallowSelectedGoodsCopy.splice(idx, 1);
        } else {
          shallowSelectedGoodsCopy.push(id);
        }

        return {
          selectedGoods: shallowSelectedGoodsCopy,
          subTotal: getTotal(goods.filter((item) => {
            return shallowSelectedGoodsCopy.indexOf(item.id) >= 0;
          })),
        };
      });
    };

    this.onElementUpdate = (id, data = {}) => {
      this.setState(({ goods, selectedGoods }) => {
        const idx = goods.findIndex((item) => item.id === id);
        const newGoods = [...goods];
        newGoods[idx] = {id, ...data};

        return {
          goods: newGoods,
          total: getTotal(newGoods),
          subTotal: getTotal(getGoodsBySelected(newGoods, selectedGoods)),
        };
      });
    };
    this.onDeleteSelected = () => {
      this.setState(({ selectedGoods, goods }) => {
        const deselectedGoods = getGoodsBySelected(goods, selectedGoods, false);

        return {
          goods: deselectedGoods,
          selectedGoods: [],
          subTotal: 0,
          total: getTotal(deselectedGoods),
        };
      });
    };
  }

  render() {
    const { total, subTotal, goods, selectedGoods } = this.state;

    return (
      <div className="Container">
        <div className="Title">{ __('Fridge') }</div>
        <GoodsList
          goods={ goods }
          categories={ categories }
          selectedItems={ selectedGoods }
          onDelete={this.onDelete}
          onElementToggle={ this.onElementToggle }
          onElementUpdate={ this.onElementUpdate }
        />
        <div className="Total">
          <div>{__('Total')}:</div>
          <div>{total}</div>
          <div>{
            selectedGoods.length > 0 && `${ __('SubTotal') }: ${subTotal}`
          }</div>
        </div>
        { !!selectedGoods.length && (
          <button onClick={ this.onDeleteSelected }>
            { __('Delete Selected') }
          </button>
        ) }
        <GoodsListForm onAdd={this.onAdd} categories={ categories } />
      </div>
    );
  }
}
