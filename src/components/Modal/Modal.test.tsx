import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  afterEach(cleanup);
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
    // @ts-ignore
    render(<Modal />);
  });
  afterEach(cleanup);
  it.concurrent('Modal should render', () => {
    screen.getByText(/Delete comment/i);
    screen.getByText(/no, cancel/i);
    screen.getByText(/yes, delete/i);
  });
  it.concurrent('Delete and cancel should be buttons', () => {
    screen.getByRole('button', { name: /no, cancel/i });
    screen.getByRole('button', { name: /yes, delete/i });
  });
  it.concurrent('should be a close button', () => {
    screen.getByRole('button', { name: /x/i });
  });
  it.concurrent('should be call close function when x button is called', () => {
    cleanup();
    const mock = vi.fn();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    render(<Modal close={mock} />);

    const closeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(closeButton);

    expect(mock).toBeCalled();
    expect(mock).toBeCalledTimes(1);
  });
  it.concurrent('should be call close when cancel button is called', () => {
    cleanup();
    const mock = vi.fn();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    render(<Modal close={mock} />);

    const cancelButton = screen.getByRole('button', { name: /no, cancel/i });
    fireEvent.click(cancelButton);

    expect(mock).toBeCalled();
    expect(mock).toBeCalledTimes(1);
  });
});
