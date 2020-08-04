import React, {Component} from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';

export default class GoodsListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      title: '',
      weight: 0,
      description: '',
    };

    this.onEdit = (e) => {
      e.stopPropagation();
      const { item: { title, weight, description } } = this.props;
      this.setState({
        editing: true,
        title,
        weight,
        description,
      });
    };

    this.onInputChange = ({ target }) => {
      this.setState({
        [target.name]: target.value,
      });
    };

    this.onSave = (e) => {
      this.setState({
        editing: false,
      });
      const { title, weight, description } = this.state;
      this.props.onSave(this.props.item.id, { title, weight, description });
    };

    this.onDelete = (e) => {
      e.stopPropagation();
      this.props.onDelete(this.props.item.id);
    };

    this.onToggle = (e) => {
      if (!this.state.editing) {
        this.props.onToggle(this.props.item.id);
      }
    };
  }

  render() {
    const { item: { title, weight, description }, selected } = this.props;
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

    return (
      <div className={ elementClassName } onClick={ this.onToggle }>
        <div className="GoodsListElement_Column">{ titleColumnContent }</div>
        <div className="GoodsListElement_Column">{ weightColumnContent }</div>
        <div className={ 'GoodsListElement_Column ' +
          'GoodsListElement_ColumnDescription' }>
          { descriptionColumnContent }
        </div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
          {
            ( !this.state.editing &&
              <button onClick={this.onEdit}>Edit</button>
            ) || <button onClick={this.onSave}>Save</button>
          }
          <button onClick={this.onDelete}>Delete</button>
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
  }),
  selected: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};
