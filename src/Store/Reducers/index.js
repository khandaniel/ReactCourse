import { goods } from '../../Mocks/GoodsMock';
import { categories } from '../../Mocks/CategoriesMock';
import { getGoodsBySelected, getTotal } from '../../Utils/goodsUtils';

const initialState = {
  goods,
  selectedItems: [],
  categories,
  defaultCategory: 'uncategorized',
  total: getTotal(goods),
  subTotal: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEM_SELECTED': {
      const newSelectedItems = [
        ...state.selectedItems,
        action.itemId,
      ];
      return {
        ...state,
        selectedItems: newSelectedItems,
        subTotal: getTotal(getGoodsBySelected(state.goods, newSelectedItems)),
      };
    }
    case 'UNSET_ITEM_SELECTED': {
      const idx = state.selectedItems
          .findIndex((itemId) => itemId === action.itemId);
      const newSelectedItems = [...state.selectedItems];
      newSelectedItems.splice(idx, 1);
      return {
        ...state,
        selectedItems: newSelectedItems,
        subTotal: getTotal(getGoodsBySelected(state.goods, newSelectedItems)),
      };
    }
    case 'DELETE_ITEM': {
      const newGoods = [...state.goods];
      const idxGoods = newGoods.findIndex((item) => item.id === action.itemId);
      newGoods.splice(idxGoods, 1);
      const newSelectedItems = [...state.selectedItems];
      const idxSelected = newSelectedItems
          .findIndex((id) => id === action.itemId);
      newSelectedItems.splice(idxSelected, 1);
      return {
        ...state,
        goods: newGoods,
        selectedItems: newSelectedItems,
        total: getTotal(newGoods),
        subTotal: getTotal(getGoodsBySelected(newGoods, newSelectedItems)),
      };
    }
    case 'UPDATE_ITEM': {
      const idxGoods = state.goods
          .findIndex((item) => item.id === action.itemId);
      const newGoods = [...state.goods];
      newGoods[idxGoods] = {id: action.itemId, ...action.item};
      return {
        ...state,
        goods: newGoods,
        total: getTotal(newGoods),
        subTotal: getTotal(getGoodsBySelected(newGoods, state.selectedItems)),
      };
    }
    case 'ADD_ITEM': {
      const newGoods = [
        ...state.goods,
        action.item,
      ];
      return {
        ...state,
        goods: newGoods,
        total: getTotal(newGoods),
      };
    }
    case 'DELETE_SELECTED': {
      const newGoods = getGoodsBySelected(
          state.goods,
          state.selectedItems,
          false,
      );
      return {
        ...state,
        goods: newGoods,
        selectedItems: [],
        total: getTotal(newGoods),
        subTotal: 0,
      };
    }
    default:
      return state;
  }
};

export default reducer;
