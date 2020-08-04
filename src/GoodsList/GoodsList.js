import React, { Component } from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';

export default class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.onDelete = (id) => {
      this.props.onDelete(id);
    };
  }

  render() {
    const { goods, categories, selectedItems, onElementToggle } = this.props;
    return (
      <div>
        {Array.isArray(goods) && goods.map( (item) => {
          const selected = selectedItems.indexOf(item.id) >= 0;
          return (
            <GoodsListElement
              item={ item }
              categories={ categories }
              key={ item.id }
              selected={ selected }
              onSave={ this.props.onElementUpdate }
              onDelete={ this.onDelete }
              onToggle={ onElementToggle }
            />
          );
        })}
      </div>
    );
  }
}

GoodsList.defaultProps = {
  goods: [],
  selectedItems: [],
};

GoodsList.propTypes = {
  goods: PropTypes.array,
  categories: PropTypes.array,
  selectedItems: PropTypes.array,
  onDelete: PropTypes.func,
  onElementToggle: PropTypes.func,
  onElementUpdate: PropTypes.func,
};
