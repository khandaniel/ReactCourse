import React from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';

const GoodsList = (props) => {
  const { goods, categories, selectedItems, onElementToggle, onDelete } = props;
  return (
    <div>
      { goods.map((item) => {
        const selected = selectedItems.indexOf(item.id) >= 0;
        return (
          <GoodsListElement
            item={ item }
            categories={ categories }
            key={ item.id }
            selected={ selected }
            onSave={ props.onElementUpdate }
            onDelete={ onDelete }
            onToggle={ onElementToggle }
          />
        );
      }) }
    </div>
  );
};

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

export default GoodsList;
