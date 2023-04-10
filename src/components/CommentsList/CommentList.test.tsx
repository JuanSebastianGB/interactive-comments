import { cleanup, render, screen } from '@testing-library/react';
import { apiResponse } from '../mocks';
import CommentsList from './CommentsList';

describe('CommentList', () => {
  it.concurrent('should render a list of comments', () => {
    // @ts-ignore
    render(<CommentsList />);
  });
  it.concurrent('should render a list of elements', () => {
    cleanup();
    const comments = [1, 2];
    // @ts-ignore
    render(<CommentsList comments={comments} />);
    screen.getAllByTestId('list-element');
  });
  it.concurrent(
    'should not render a list of elements if props were not provided',
    () => {
      cleanup();
      // @ts-ignore
      render(<CommentsList />);
      expect(screen.queryAllByTestId('list-element')).toHaveLength(0);
      screen.getByText(/no comments/i);
    }
  );
  it.concurrent('should render text 1 month ago if comments provided', () => {
    cleanup();
    render(<CommentsList comments={apiResponse.comments} />);
    screen.getByText(/1 month ago/i);
  });
  it.concurrent('should render 12 if comments provided', () => {
    cleanup();
    render(<CommentsList comments={apiResponse.comments} />);
    screen.getByText(/12/i);
  });
  it.concurrent(
    'should render the specific content if comments provided',
    () => {
      cleanup();
      render(<CommentsList comments={apiResponse.comments} />);
      screen.getByText(
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
      );
    }
  );
});