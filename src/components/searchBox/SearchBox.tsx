import React, { useState } from 'react';
import './SearchBox.scss';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className='search-box--container'>
      <Link className='logo' to='/'>LIME</Link>
      <form className='search-box--form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit"><FiSearch /></button>
      </form>
    </div>
  );
};
