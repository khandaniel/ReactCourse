import React, {Component} from 'react';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategoriesSelect/CategorySelect';

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
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            className="GoodsListFormInput"
            placeholder="Weight"
            name="weight"
            value={weight}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            className="GoodsListFormInput"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.onInputChange}
          />

          <CategorySelect
            onChange={ this.onInputChange }
            categories={ this.props.categories }
          />

          <button className="GoodsListFormButton">Add</button>
        </form>
      </div>
    );
  }
}

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  categories: PropTypes.array,
};
