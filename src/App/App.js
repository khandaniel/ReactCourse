import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GoodsList from '../GoodsList/GoodsList';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import __ from '../Utils/translationsUtils';
import { deleteSelected } from '../Store/Actions/goodsListElementActions';

import './App.css';

const App = (props) => {
  const { total, subTotal, selectedItems, deleteSelected } = props;

  return (
    <div className="Container">
      <div className="Title">{ __('Fridge') }</div>
      <GoodsList />
      <div className="Total">
        <div>{__('Total')}:</div>
        <div>{total}</div>
        <div>
          { !!subTotal && `${ __('SubTotal') }: ${subTotal}`}
        </div>
      </div>
      { !!selectedItems.length && (
        <button onClick={ deleteSelected }>
          { __('Delete Selected') }
        </button>
      ) }
      <GoodsListForm />
    </div>
  );
};

App.propTypes = {
  total: PropTypes.number,
  subTotal: PropTypes.number,
  selectedItems: PropTypes.array,
  deleteSelected: PropTypes.func,
};

const mapStateToProps = ({ total, subTotal, selectedItems }) => {
  return { total, subTotal, selectedItems };
};

export default connect(mapStateToProps, { deleteSelected })(App);
