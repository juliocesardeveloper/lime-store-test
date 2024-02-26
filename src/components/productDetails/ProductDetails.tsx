/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Category, ProductDetailProps } from '../../../interfaces/general.interface';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductDetails.scss';
import { BreadcrumbComponent } from '../breadcrumb/Breadcrumb';

export const ProductDetails: React.FC<ProductDetailProps> = ({
  title,
  price,
  picture,
  condition,
  description,
  category
}) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const productPrice = price.amount.toLocaleString();
  const productCondition = condition[0].toUpperCase() + condition.slice(1);
  const productCategoryId = category

  const fetchProductCategory = () => {
    axios.get(`https://api.mercadolibre.com/categories/${productCategoryId}`)
      .then(response => {
        const categoriesArray = [];
        categoriesArray.push(
          {
            id: response.data.id,
            name: response.data.name
          }
        )
        setCategories( categoriesArray )
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }

  useEffect(() => {
    fetchProductCategory()
  }, [productCategoryId])
  

  const handleBuy = () => {
    return alert('Gracias por tu compra!')
  }

  return (
    <div>
      <BreadcrumbComponent categories={categories} />
      <div className='product-details--container'>
        <section className='product-details--image-description'>
          <img src={picture} alt={title} />
          <div className='product-details--description'>
            <h3>Descripción del producto</h3>
            <p>{description}</p>
          </div>
        </section>
        <section className='product-details--summary'>
          <p>{productCondition}</p>
          <p>{title}</p>
          <p>{`$ ${productPrice},${price.decimals}`}</p>
          <Link to='/'>
            <button
            onClick={handleBuy}
            >
                Comprar
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};
