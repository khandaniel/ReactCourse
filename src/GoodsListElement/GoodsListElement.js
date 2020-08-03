import React, {Component} from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';

export default class GoodsListElement extends Component {
  constructor(props) {
    super(props);

    this.onDelete = (e) => {
      e.stopPropagation();
      this.props.onDelete(this.props.item.id);
    };

    this.onToggle = (e) => {
      this.props.onToggle(this.props.item.id);
    };
  }

  render() {
    const { item: { title, weight, description }, selected } = this.props;
    const elementClassName = selected ?
      'GoodsListElement isSelected' : 'GoodsListElement';
    return (
      <div className={ elementClassName } onClick={ this.onToggle }>
        <div className="GoodsListElement_Column">{title}</div>
        <div className="GoodsListElement_Column">{weight}</div>
        <div className={ 'GoodsListElement_Column ' +
          'GoodsListElement_ColumnDescription' }>
          {description}
        </div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
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
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};
