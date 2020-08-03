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
      this.setState(({ goods }) => {
        const idx = goods.findIndex((item) => item.id === id);
        const updatedGoods = [...goods];
        updatedGoods[idx] = {
          ...goods[idx],
          selected: !goods[idx].selected,
        };

        return {
          goods: updatedGoods,
          subTotal: getTotal(updatedGoods.filter((item) => item.selected)),
        };
      });
    };
  }

  render() {
    const { total, subTotal, goods } = this.state;
    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList goods={goods}
          onDelete={this.onDelete}
          onElementToggle={ this.onElementToggle }
        />
        <div className="Total">
          <div>Total:</div>
          <div>{total}</div>
          <div>{ subTotal && `SubTotal: ${subTotal}`}</div>
        </div>
        <GoodsListForm onAdd={this.onAdd} />
      </div>
    );
  }
}
