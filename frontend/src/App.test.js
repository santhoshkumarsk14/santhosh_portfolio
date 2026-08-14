import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Java Backend Developer/i);
  expect(headingElement).toBeInTheDocument();
});
