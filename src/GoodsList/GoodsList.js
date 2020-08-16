import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoodsListElement from '../GoodsListElement/GoodsListElement';

const GoodsList = (props) => {
  const { goods, selectedItems } = props;
  return (
    <div>
      { goods.map((item) => {
        const selected = selectedItems.indexOf(item.id) >= 0;
        return (
          <GoodsListElement
            item={ item }
            key={ item.id }
            selected={ selected }
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
  selectedItems: PropTypes.array,
};

const mapStateToProps = ({ goods, selectedItems }) => {
  return {
    goods,
    selectedItems,
  };
};

export default connect(mapStateToProps)(GoodsList);
