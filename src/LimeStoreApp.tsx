import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import SearchPage from './pages/search/SearchPage';

export const LimeStoreApp = () => {
  return (
    <BrowserRouter>
      <SearchPage />
      <AppRouter />
    </BrowserRouter>
  )
}
