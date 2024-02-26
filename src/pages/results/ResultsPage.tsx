import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultsItem } from '../../components';
import { fetchSearchResults } from '../../services/api';
import { Category, Product } from '../../../interfaces/general.interface';
import { BreadcrumbComponent } from '../../components/breadcrumb/Breadcrumb';
import './ResultsPage.scss';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';
  const [results, setResults] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const data = await fetchSearchResults(searchQuery);
          setResults(data.items);
          const categoriesData = data.categories;
          setCategories(categoriesData || []);
        }
      } catch (error) {
        alert(`Ha ocurrido un error con tu búsqueda, este es el error que envía el servidor: ${error.response.data.error}`)
        setErrorMessage(error.response.data.error)
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className='results-main--container'>
      {results ? (
        <div>
          <BreadcrumbComponent categories={categories} />
          <div className='results-items--container'>
            {results?.map((product: Product) => (
              <SearchResultsItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      ) :
      (errorMessage ? null : <p>Cargando resultados...</p>)
      }
    </div>
  );
};

export default ResultsPage;