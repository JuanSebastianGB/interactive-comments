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
  it.concurrent('should have reply button if the user is the same', () => {
    render(<CommentSectionButtons isSameUser={true} />);
    screen.getByRole('button', { name: /Edit/i });
    screen.getByRole('button', { name: /Delete/i });
  });
  it.concurrent('should have replay button if the user is different', () => {
    render(<CommentSectionButtons isSameUser={false} />);
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

      render(<CommentSectionButtons isReply={true} isSameUser={true} />);
      const button = screen.getByTestId('open-modal-delete-comment');
      fireEvent.click(button);
      screen.getByRole('dialog');
      screen.getByText(/Delete comment/i);
      screen.getByText(/Yes, delete/i);
    }
  );
  it.concurrent('should close modal when delete button is clicked', () => {
    cleanup();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    render(<CommentSectionButtons isReply={true} isSameUser={true} />);
    const openButtonModal = screen.getByTestId('open-modal-delete-comment');

    fireEvent.click(openButtonModal);

    const buttonDeleteComment = screen.getByText(/Yes, delete/i);
    fireEvent.click(buttonDeleteComment);

    expect(screen.queryByText(/Delete comment/i)).toBeNull();
    expect(screen.queryByText(/Yes, delete/i)).toBeNull();
    expect(screen.queryByText(/No, cancel/i)).toBeNull();
  });
});
