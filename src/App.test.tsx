import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import { CommentsList } from './components';
import data from './data.json';
beforeEach(() => {
  render(<App />);
});
describe('App', () => {
  it.concurrent('should find by data-testid a comments section', () => {
    screen.getByTestId('comments-section');
  });
  it.concurrent('should render a list of comments', () => {
    render(<CommentsList />);
  });
  it.concurrent('should render a list of elements', () => {
    cleanup();
    const comments = [1, 2];
    render(<CommentsList comments={comments} />);
    screen.getAllByTestId('list-element');
  });
  it.concurrent(
    'should not render a list of elements if props were not provided',
    () => {
      cleanup();
      render(<CommentsList />);
      expect(screen.queryAllByTestId('list-element')).toHaveLength(0);
      screen.getByText(/no comments/i);
    }
  );
  it.concurrent('should render text 1 month ago if comments provided', () => {
    cleanup();
    render(<CommentsList comments={data.comments} />);
    screen.getByText(/1 month ago/i);
  });
  it.concurrent('should render 12 if comments provided', () => {
    cleanup();
    render(<CommentsList comments={data.comments} />);
    screen.getByText(/12/i);
  });
  it.concurrent(
    'should render the specific content if comments provided',
    () => {
      cleanup();
      render(<CommentsList comments={data.comments} />);
      screen.getByText(
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
      );
    }
  );
});
