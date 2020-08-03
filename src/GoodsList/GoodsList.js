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
    const { goods, onElementToggle } = this.props;
    return (
      <div>
        {Array.isArray(goods) && goods.map( (item) => {
          return (
            <GoodsListElement
              item={item}
              key={item.id}
              onDelete={this.onDelete}
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
};

GoodsList.propTypes = {
  goods: PropTypes.array,
  onDelete: PropTypes.func,
  onElementToggle: PropTypes.func,
};
