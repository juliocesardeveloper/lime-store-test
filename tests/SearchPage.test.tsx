import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from '../src/pages/search/SearchPage';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchPage component', () => {
  it('navigates to the correct URL when onSearch is called', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the component
    render(<MemoryRouter><SearchPage /></MemoryRouter>);

    // Get input and button elements
    const inputElement = screen.getByPlaceholderText('Buscar productos...');
    const submitButton = screen.getByRole('button', { name: '' }); // Add proper accessibility text if needed

    // Type a query in the input
    fireEvent.change(inputElement, { target: { value: 'test-query' } });

    // Submit the form
    act(() => {
      fireEvent.click(submitButton);
    });

    // Check if useNavigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith('/items?search=test-query');
  });

  it('shows alert if query is empty', () => {
    // Mock the global alert function
    const originalAlert = window.alert;
    window.alert = jest.fn();

    // Render the component
    render(<MemoryRouter><SearchPage /></MemoryRouter>);

    // Get button element
    const submitButton = screen.getByRole('button', { name: '' }); // Add proper accessibility text if needed

    // Submit the form without entering a query
    act(() => {
      fireEvent.click(submitButton);
    });

    // Check if alert was called with the correct message
    expect(window.alert).toHaveBeenCalledWith('Debes escribir en el campo para poder realizar la búsqueda.');

    // Restore the original alert function
    window.alert = originalAlert;
  });
});