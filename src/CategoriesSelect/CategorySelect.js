import React from 'react';
import PropTypes from 'prop-types';
import './CategorySelect.css';

const CategorySelect = (props) => {
  const { onChange, categories, defaultValue } = props;
  return (
    <select
      className="CategorySelect"
      name="category"
      defaultValue={ defaultValue }
      onChange={ onChange }>
      { categories.map(({ id, name, slug }) => (
        <option key={ id } value={ slug }>
          {name}
        </option>
      ) ) }
    </select>
  );
};

CategorySelect.propTypes = {
  categories: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default CategorySelect;
