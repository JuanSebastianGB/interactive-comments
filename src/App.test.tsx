import { render, screen } from '@testing-library/react';
import App from './App';
beforeEach(() => {
  render(<App />);
});
describe('App', () => {
  it.concurrent('should find by data-testid a comments section', () => {
    screen.getByTestId('comments-section');
  });
});
