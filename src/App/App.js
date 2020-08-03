import React, { Component } from 'react';

import './App.css';

import GoodsList from '../GoodsList/GoodsList';
import { goods } from '../Mocks/GoodsMock';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import { addNewItem, removeElementById, getTotal } from '../Utils/goodsUtils';

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
  }

  render() {
    const { total, subTotal, goods, selectedGoods } = this.state;

    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList goods={goods}
          selectedItems={ selectedGoods }
          onDelete={this.onDelete}
          onElementToggle={ this.onElementToggle }
        />
        <div className="Total">
          <div>Total:</div>
          <div>{total}</div>
          <div>{ selectedGoods.length > 0 && `SubTotal: ${subTotal}`}</div>
        </div>
        <GoodsListForm onAdd={this.onAdd} />
      </div>
    );
  }
}
