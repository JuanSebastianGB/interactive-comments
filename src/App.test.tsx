import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it.concurrent('should find Comments as title', () => {
    render(<App />);
    screen.getByText(/comments/i);
  });
});
