import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils';
import Modal from '../modal';
import useModal from '../../hooks/useModal';
import Cart from '../cart';
import './style.css';

function CartControls({ cart, totalPrice, totalItems, onRemoveFromCart }) {
  const cn = bem('CartControls');
  const [isShowingModal, toggleModal] = useModal();

  return (
    <>
      <Modal title="Корзина" show={isShowingModal} onCloseButtonClick={toggleModal}>
        <Cart
          cart={cart}
          onRemoveFromCart={onRemoveFromCart}
          totalPrice={totalPrice}
          totalItems={totalItems}
        />
      </Modal>

      <div className={cn()}>
        <span className={cn('text')}>В корзине:</span>
        <span className={cn('info')}>
          {!cart.length
            ? 'Пусто'
            : `${cart.length} ${plural(cart.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${totalPrice} ₽`}{' '}
        </span>
        <button onClick={toggleModal}>Перейти</button>
      </div>
    </>
  );
}

CartControls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(CartControls);
