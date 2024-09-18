import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, inCart = false, onAddToCart, onRemoveFromCart }) {
  const cn = bem('Item');

  const callbacks = {
    handleAddToCart: () => {
      onAddToCart(item.code);
    },

    handleRemoveFromCart: () => {
      onRemoveFromCart(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title} </div>
      <div className={cn('actions')}>
        <div className={cn('info')}>
          <span>{item.price} ₽</span>
          <span>{item.quantity ? `${item.quantity} шт` : ''}</span>
        </div>
        {inCart ? (
          <button onClick={callbacks.handleRemoveFromCart}>Удалить</button>
        ) : (
          <button onClick={callbacks.handleAddToCart}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  inCart: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(Item);
