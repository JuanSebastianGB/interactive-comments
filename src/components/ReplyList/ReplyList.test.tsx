import { fireEvent, render, screen, within } from '@testing-library/react';
import { UserProvider } from '../../context';
import { apiResponse } from '../mocks';
import { ReplyList } from './ReplayList';

describe('ReplyList', () => {
  it.concurrent('should render a list of items', () => {
    // @ts-ignore
    render(<ReplyList replies={apiResponse.comments[1].replies} />);
    screen.getAllByRole('listitem');
  });
  it.concurrent('should render a list of 2 items', () => {
    // @ts-ignore

    render(<ReplyList replies={apiResponse.comments[1].replies} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
  it.concurrent(
    'should not render elements if a length 0 list is passed ',
    () => {
      // @ts-ignore

      render(<ReplyList replies={[]} />);

      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0);
    }
  );
  it.concurrent('should be able to found a list', () => {
    // @ts-ignore

    render(<ReplyList replies={apiResponse.comments[1].replies} />);
    screen.getByRole('list');
  });
  it.concurrent('should remove a list item', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    render(
      <UserProvider>
        {/* @ts-ignore */}
        <ReplyList replies={apiResponse.comments[1].replies} />
      </UserProvider>
    );

    let listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(2);

    const lastElement = listItems[1];
    const openModalButton = within(lastElement).getByTestId(
      'open-modal-delete-comment'
    );
    fireEvent.click(openModalButton);

    const buttonDeleteComment = screen.getByText(/Yes, delete/i);
    fireEvent.click(buttonDeleteComment);

    listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(2);
  });
});
