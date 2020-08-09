import React, { useState, useCallback } from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategorySelect/CategorySelect';
import { getCategory } from '../Utils/categoriesUtils';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';

const GoodsListElement = (props) => {
  const { item, onSave, onDelete, onToggle, selected, categories } = props;
  const { id, title, weight, description, category = 'uncategorized' } = item;

  const [editing, setEditing] = useState(false);
  const [titleState, setTitle] = useState('');
  const [weightState, setWeight] = useState(0);
  const [descriptionState, setDescription] = useState('');
  const [categoryState, setCategory] = useState('');

  const onElementEdit = useCallback((e) => {
    e.stopPropagation();
    setEditing(true);
    setTitle(title);
    setWeight(weight);
    setDescription(description);
    setCategory(category);
  }, [title, weight, description, category]);

  const onInputChange = useCallback(({ target }) => {
    let setter;
    switch (target.name) {
      case 'title':
        setter = setTitle;
        break;
      case 'description':
        setter = setDescription;
        break;
      case 'category':
        setter = setCategory;
        break;
      default:
        break;
    }

    if (typeof setter !== 'function') return;
    setter(target.value);
  }, []);

  const onWeightChange = useCallback(({ target }) => {
    const value = target.value.replace(',', '.');

    if (!validateNumericInput(value)) {
      return;
    }

    setWeight(value);
  }, []);

  const onElementSave = useCallback((e) => {
    e.stopPropagation();
    setEditing(false);
    onSave(id, {
      title: titleState,
      weight: weightState,
      description: descriptionState,
      category: categoryState,
    });
  }, [
    id,
    titleState,
    weightState,
    descriptionState,
    categoryState,
    onSave,
  ]);

  const onElementDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete(id);
  }, [onDelete, id]);

  const onElementToggle = useCallback(() => {
    if (!editing) {
      onToggle(id);
    }
  }, [editing, onToggle, id]);

  const onRowAction = useCallback((e) => {
    if (editing) {
      onElementSave(e);
    } else {
      onElementEdit(e);
    }
  }, [editing, onElementSave, onElementEdit]);

  const elementClassName = selected ?
    'GoodsListElement isSelected' : 'GoodsListElement';
  const titleColumnContent = editing ?
    <input type="text"
      defaultValue={ title }
      name="title"
      onChange={ onInputChange }
    /> :
    title;
  const weightColumnContent = editing ?
    <input type="number"
      defaultValue={ weight }
      name="weight"
      onChange={ onWeightChange }
    /> :
    weight;
  const descriptionColumnContent = editing ?
    <input type="text"
      defaultValue={ description }
      name="description"
      onChange={ onInputChange }
    /> :
    description;
  const categoryColumnContent = editing ?
    <CategorySelect
      categories={ categories }
      defaultValue={ category }
      onChange={ onInputChange }
    /> :
    getCategory(category, 'slug', categories)?.name;

  return (
    <div className={ elementClassName } onClick={ onElementToggle }>
      <div className="GoodsListElement_Column">{ titleColumnContent }</div>
      <div className="GoodsListElement_Column">{ weightColumnContent }</div>
      <div className={ 'GoodsListElement_Column ' +
        'GoodsListElement_ColumnDescription' }>
        { descriptionColumnContent }
      </div>
      <div className="GoodsListElement_Column">{ categoryColumnContent }</div>
      <div className="GoodsListElement_Column GoodsListElement_Button">
        <button onClick={ onRowAction }>
          { __(editing ? 'Save' : 'Edit' ) }
        </button>
        <button onClick={ onElementDelete }>{ __('Delete') }</button>
      </div>
    </div>
  );
};

GoodsListElement.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    weight: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  categories: PropTypes.array,
  selected: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};

export default GoodsListElement;