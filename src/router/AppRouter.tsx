import { Route, Routes } from "react-router-dom"
import ResultPage from "../pages/results/ResultsPage"
import ProductDetailsPage from "../pages/product/ProductDetailsPage"
import { HomePage } from "../pages/home/HomePage"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/items" element={ <ResultPage /> } />
      <Route path="/items/:id" element={ <ProductDetailsPage /> } />
    </Routes>
  )
}
