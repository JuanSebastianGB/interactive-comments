import { cleanup, render, screen } from '@testing-library/react';
import CommentSectionButtons from './CommentSectionButtons';

describe('CommentSectionButtons', () => {
  afterEach(() => {
    cleanup();
  });
  it.concurrent('should render', () => {
    render(<CommentSectionButtons />);
  });
  it.concurrent('should have at least one button', () => {
    render(<CommentSectionButtons />);
    screen.getByRole('button');
  });
  it.concurrent('should have reply button if is not a reply comment', () => {
    render(<CommentSectionButtons isReply={false} />);
    screen.getByRole('button', { name: /reply/i });
  });
  it.concurrent(
    'should have replay button if is a reply and not is the same user',
    () => {
      render(<CommentSectionButtons isReply={true} isDifferentUser={true} />);
      screen.getByRole('button', { name: /reply/i });
    }
  );
  it.concurrent(
    ' should show edit and delete buttons if isReplay and is the same user',
    () => {
      render(<CommentSectionButtons isReply={true} isDifferentUser={false} />);
      screen.getByRole('button', { name: /edit/i });
      screen.getByRole('button', { name: /delete/i });
    }
  );
  it.concurrent('should have reply button if isReplay not provided', () => {
    render(<CommentSectionButtons />);
    screen.getByRole('button', { name: /reply/i });
  });
});
