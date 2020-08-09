import React, { useState, useCallback } from 'react';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategorySelect/CategorySelect';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';

const GoodsListForm = (props) => {
  const categoryDefault = props.categories ?
    props.categories[0].slug : 'uncategorized';

  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categoryDefault);
  const { onAdd } = props;

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    onAdd({ title, weight, description, category });
    setTitle('');
    setWeight('');
    setDescription('');
  }, [title, weight, description, category, onAdd]);

  const onInputChange = useCallback(({target}) => {
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

  return (
    <div>
      <form
        className="GoodsListForm"
        onSubmit={ onFormSubmit }
      >
        <input
          type="text"
          className="GoodsListFormInput"
          placeholder={ __('Title') }
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <input
          type="number"
          className="GoodsListFormInput"
          placeholder={ __('Weight') }
          name="weight"
          value={ weight }
          onChange={ onWeightChange }
        />
        <input
          type="text"
          className="GoodsListFormInput"
          placeholder={ __('Description') }
          name="description"
          value={ description }
          onChange={ onInputChange }
        />

        <CategorySelect
          onChange={ onInputChange }
          defaultValue={ category }
          categories={ props.categories }
        />

        <button className="GoodsListFormButton">{ __('Add') }</button>
      </form>
    </div>
  );
};

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  categories: PropTypes.array,
};

export default GoodsListForm;
