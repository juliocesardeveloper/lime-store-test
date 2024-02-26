import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '../../components';
import './SearchPage.scss';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    query.length > 0 ?
      navigate(`/items?search=${query}`) :
      alert('Debes escribir en el campo para poder realizar la búsqueda.')
  };

  return (
    <div className='search-box-container'>
      <SearchBox onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;