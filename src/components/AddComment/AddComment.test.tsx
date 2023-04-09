import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import data from '../../data.json';
import AddComment from './AddComment';

beforeEach(() => {
  render(<AddComment data={data} />);
});

describe('AddComment', () => {
  it.concurrent('should have a button with text SEND', () => {
    screen.getByRole('button', { name: /send/i });
  });
  it.concurrent('should have a comment section', () => {
    screen.getByPlaceholderText(/Add a comment.../);
  });
  it.concurrent('should render an image', () => {
    screen.getByAltText(/user image/i);
  });
  it.concurrent('send button should be disabled', () => {
    const button = screen.getByRole('button', { name: /send/i });
    expect(button.hasAttribute('disabled')).toBe(true);
  });
  it.concurrent(
    'should disable to send data when text area has less than 4 characters',
    () => {
      const textArea = screen.getByPlaceholderText(
        /Add a comment.../
      ) as HTMLTextAreaElement;
      fireEvent.change(textArea, { target: { value: 'hel' } });
      const button = screen.getByRole('button', { name: /send/i });
      expect(button.hasAttribute('disabled')).toBe(true);
    }
  );
  it.concurrent(
    'should enable to send data when text area has more than 4 characters',
    () => {
      const textArea = screen.getByPlaceholderText(
        /Add a comment.../
      ) as HTMLTextAreaElement;
      fireEvent.change(textArea, { target: { value: 'hello world' } });
      const button = screen.getByRole('button', { name: /send/i });
      expect(button.classList[0]).not.toBe('disabled');
    }
  );
  it.concurrent('should exist a form', () => {
    screen.getByRole('form');
  });
  it.concurrent(
    'when send button is clicked, text area should be empty',
    () => {
      const textArea = screen.getByPlaceholderText(
        /Add a comment.../
      ) as HTMLTextAreaElement;
      fireEvent.change(textArea, { target: { value: 'hello world' } });
      const button = screen.getByRole('button', { name: /send/i });
      fireEvent.click(button);
      expect(textArea.value).toBe('');
    }
  );
  it.concurrent('should submit the form with the right credentials', () => {
    cleanup();
    const formInfo = {
      textArea: 'hello world',
    };
    const submit = vi.fn();
    render(<AddComment data={data} submit={submit} />);
    const button = screen.getByRole('button', { name: /send/i });
    const textArea = screen.getByPlaceholderText(
      /Add a comment.../
    ) as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: 'hello world' } });
    fireEvent.click(button);
    expect(submit).toBeCalledWith(formInfo);
  });
  it.concurrent(
    'should not submit the form if the text area is empty or has less than 4 chars',
    () => {
      cleanup();
      const submit = vi.fn();
      render(<AddComment data={data} submit={submit} />);
      const button = screen.getByRole('button', { name: /send/i });
      fireEvent.click(button);
      expect(submit).not.toBeCalled();
      expect(button.hasAttribute('disabled')).toBe(true);
    }
  );
  it.concurrent('send button should be disabled after a submit action', () => {
    const button = screen.getByRole('button', { name: /send/i });
    const textArea = screen.getByPlaceholderText(
      /Add a comment.../
    ) as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: 'hello world' } });
    expect(button.hasAttribute('disabled')).toBe(false);
  });
});
