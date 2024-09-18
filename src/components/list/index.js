import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ list, inCart, onAddToCart, onRemoveFromCart }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            inCart={inCart}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  inCart: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(List);
