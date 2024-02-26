import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBox } from '../src/components';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBox component', () => {
  it('calls onSearch when form is submitted', () => {
    // Mock the onSearch callback
    const onSearchMock = jest.fn();

    // Render the component with the mocked callback
    render( <MemoryRouter><SearchBox onSearch={onSearchMock} /></MemoryRouter> );

    // Get input and button elements
    const inputElement = screen.getByPlaceholderText('Buscar productos...');
    const submitButton = screen.getByRole('button', { name: '' }); // Add proper accessibility text if needed

    // Type a query in the input
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if onSearch was called with the correct query
    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });
});