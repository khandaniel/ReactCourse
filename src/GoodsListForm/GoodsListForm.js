import React, {Component} from 'react';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategoriesSelect/CategorySelect';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';

export default class GoodsListForm extends Component {
  constructor(props) {
    super(props);
    const categoryDefault = props.categories ?
      props.categories[0].slug : 'uncategorized';

    this.state = {
      title: '',
      weight: '',
      description: '',
      category: categoryDefault,
    };

    this.onFormSubmit = (e) => {
      e.preventDefault();
      this.props.onAdd(this.state);
      this.setState({
        title: '',
        weight: '',
        description: '',
      });
    };

    this.onInputChange = ({target}) => {
      this.setState({
        [target.name]: target.value,
      });
    };

    this.onWeightChange = ({ target }) => {
      const value = target.value.replace(',', '.');
      if (!validateNumericInput(value)) {
        return;
      }

      this.setState({
        [target.name]: value,
      });
    };
  }

  render() {
    const {title, weight, description} = this.state;
    return (
      <div>
        <form
          className="GoodsListForm"
          onSubmit={this.onFormSubmit}
        >
          <input
            type="text"
            className="GoodsListFormInput"
            placeholder={ __('Title') }
            name="title"
            value={title}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            className="GoodsListFormInput"
            placeholder={ __('Weight') }
            name="weight"
            value={weight}
            onChange={this.onWeightChange}
          />
          <input
            type="text"
            className="GoodsListFormInput"
            placeholder={ __('Description') }
            name="description"
            value={description}
            onChange={this.onInputChange}
          />

          <CategorySelect
            onChange={ this.onInputChange }
            categories={ this.props.categories }
          />

          <button className="GoodsListFormButton">{ __('Add') }</button>
        </form>
      </div>
    );
  }
}

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  categories: PropTypes.array,
};
