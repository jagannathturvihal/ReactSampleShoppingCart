import React from 'react';
import { ShoppingStoreContext } from '../store/shopping-store-context';

// export default function Cart({ items, onUpdateItemQuantity }) {
export default function Cart() {
  
  // React 19 and above, use also works
  // const cartContext = React.use(ShoppingStoreContext);
  // const cartContext = React.useContext(ShoppingStoreContext);

  const { items, onUpdateCart } = React.useContext(ShoppingStoreContext);

  // const totalPrice = cartContext.items.reduce(
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateCart(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateCart(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
