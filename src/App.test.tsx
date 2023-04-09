import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
});
describe('App', () => {
  it.concurrent('should find Comments as title', () => {
    screen.getByText(/comments/i);
  });
});
