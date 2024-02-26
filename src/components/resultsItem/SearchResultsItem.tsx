import React from 'react';
import { Link } from 'react-router-dom';
import { ProductDetailProps } from '../../../interfaces/general.interface';
import './SearchResultsItem.scss'

export const SearchResultsItem: React.FC<ProductDetailProps> = ({
  id,
  title,
  price,
  picture,
  condition,
  freeShipping,
}) => {

  const productPrice = price.amount.toLocaleString();
  const productCondition = condition[0].toUpperCase() + condition.slice(1);

  return (
    <div className='results-item--container'>
      <Link className='results-item--subContainer' to={`/items/${id}`}>
        <img className='results-item--image' src={picture} alt={title} />
        <div className='results-item--props'>
          <p>{`$ ${productPrice},${price.decimals}`}</p>
          <p>{title}</p>
          <p>{productCondition}</p>
          {freeShipping && <p>Envío Gratis</p>}
        </div>
      </Link>
    </div>
  );
};
