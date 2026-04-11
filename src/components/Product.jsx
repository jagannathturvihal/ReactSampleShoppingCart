import React from 'react';
import { ShoppingStoreContext } from '../store/shopping-store-context';

export default function Product({
  id,
  image,
  title,
  price,
  description
}) {
  const { onAddToCart } = React.useContext(ShoppingStoreContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
