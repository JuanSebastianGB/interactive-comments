import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
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
      screen.getAllByRole('button', { name: /edit/i });
      screen.getAllByRole('button', { name: /delete/i });
    }
  );
  it.concurrent('should have reply button if isReplay not provided', () => {
    render(<CommentSectionButtons />);
    screen.getByRole('button', { name: /reply/i });
  });
});

describe('modal actions', () => {
  it.concurrent('it should have modal elements not visible', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    render(<CommentSectionButtons isReply={true} isDifferentUser={false} />);

    const closeModalButton = screen.queryByText(/x/i);
    expect(closeModalButton).toBeNull();
  });
  it.concurrent(
    'should have modal elements visible when Delete button is clicked',
    () => {
      cleanup();
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);

      render(<CommentSectionButtons isReply={true} isDifferentUser={false} />);
      const button = screen.getByTestId('open-modal-delete-comment');
      fireEvent.click(button);
      screen.getByRole('dialog');
      screen.getByText(/Delete component/i);
      screen.getByText(/Yes, delete/i);
    }
  );
});
