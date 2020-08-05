import React, {Component} from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategoriesSelect/CategorySelect';
import { getCategory } from '../Utils/categoriesUtils';
import __ from '../Utils/translationsUtils';

export default class GoodsListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      title: '',
      weight: 0,
      description: '',
      category: '',
    };

    this.onEdit = (e) => {
      e.stopPropagation();
      const { item: { title, weight, description, category } } = this.props;
      this.setState({
        editing: true,
        title,
        weight,
        description,
        category,
      });
    };

    this.onInputChange = ({ target }) => {
      this.setState({
        [target.name]: target.value,
      });
    };

    this.onSave = (e) => {
      e.stopPropagation();
      const { title, weight, description, category } = this.state;
      const { item: { id }, onSave } = this.props;

      this.setState({
        editing: false,
      });
      onSave(id, { title, weight, description, category });
    };

    this.onDelete = (e) => {
      e.stopPropagation();
      this.props.onDelete(this.props.item.id);
    };

    this.onToggle = () => {
      if (!this.state.editing) {
        this.props.onToggle(this.props.item.id);
      }
    };

    this.onRowAction = (e) => {
      if (this.state.editing) {
        this.onSave(e);
      } else {
        this.onEdit(e);
      }
    };
  }

  render() {
    const { item, selected, categories } = this.props;
    const { title, weight, description, category = 'uncategorized' } = item;
    const elementClassName = selected ?
      'GoodsListElement isSelected' : 'GoodsListElement';
    const titleColumnContent = this.state.editing ?
      <input type="text"
        defaultValue={ title }
        name="title"
        onChange={ this.onInputChange }
      /> :
      title;
    const weightColumnContent = this.state.editing ?
      <input type="number"
        defaultValue={ weight }
        name="weight"
        onChange={ this.onInputChange }
      /> :
      weight;
    const descriptionColumnContent = this.state.editing ?
      <input type="text"
        defaultValue={ description }
        name="description"
        onChange={ this.onInputChange }
      /> :
      description;
    const categoryColumnContent = this.state.editing ?
      <CategorySelect
        categories={ categories }
        defaultValue={ category }
        onChange={ this.onInputChange }
      /> :
      getCategory(category, 'slug', categories).name;

    return (
      <div className={ elementClassName } onClick={ this.onToggle }>
        <div className="GoodsListElement_Column">{ titleColumnContent }</div>
        <div className="GoodsListElement_Column">{ weightColumnContent }</div>
        <div className={ 'GoodsListElement_Column ' +
          'GoodsListElement_ColumnDescription' }>
          { descriptionColumnContent }
        </div>
        <div className="GoodsListElement_Column">{ categoryColumnContent }</div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
          <button onClick={this.onRowAction}>
            { __(this.state.editing ? 'Save' : 'Edit' ) }
          </button>
          <button onClick={this.onDelete}>{ __('Delete') }</button>
        </div>
      </div>
    );
  }
}

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
