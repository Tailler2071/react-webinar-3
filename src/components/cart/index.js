import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Cart({cart, onRemoveFromCart, totalPrice, totalItems }) {
  const cn = bem('Cart');

  if (!totalItems) {
    return (
      <div className={cn('emptiness')}>
        Добавьте товары в корзину
      </div>
    )
  }

  return (
    <>
      <div className={cn('body')}>
        <List
          list={cart}
          inCart={true}
          onRemoveFromCart={onRemoveFromCart}
        />
      </div>

      <div className={cn('footer')}>
        <span>Итого</span>
        <span>{totalPrice} ₽</span>
      </div>
    </>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func,
  totalPrice: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default React.memo(Cart);
