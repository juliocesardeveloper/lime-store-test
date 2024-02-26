/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from 'axios';
import { ProductDetail, SearchResult } from '../../interfaces/general.interface';

export const fetchSearchResults = async (query: string) => {
  try {
    const response: AxiosResponse<SearchResult> = await axios.get(`http://localhost:3001/api/items?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductDetails = async (id: string): Promise<ProductDetail> => {
  try {
    const response: AxiosResponse<ProductDetail> = await axios.get(`http://localhost:3001/api/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};