import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../../components';
import { fetchProductDetails } from '../../services/api';
import { ProductDetailProps } from '../../../interfaces/general.interface';
import './ProductDetailsPage.scss';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<ProductDetailProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await fetchProductDetails(id);
          setProductDetails(data.item);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='product-main--container'>
      {productDetails ? (
        <ProductDetails {...productDetails} />
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;