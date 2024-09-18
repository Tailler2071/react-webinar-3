import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartControls from './components/cart-controls';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const totalItems = store.getTotalItems();
  const totalPrice = store.getTotalPrice();

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartControls
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onRemoveFromCart={callbacks.onRemoveFromCart}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
