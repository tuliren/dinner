import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders dinner bill title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Dinner Bill/i);
  expect(titleElement).toBeInTheDocument();
});
