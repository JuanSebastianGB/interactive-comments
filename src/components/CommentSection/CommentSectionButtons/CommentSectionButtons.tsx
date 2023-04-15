import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../Modal';
import { Reply } from '../../icons';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
export interface CommentSectionButtonsProps {
  isReply?: boolean;
  isSameUser?: boolean;
  openModal: Function;
  id: number;
}

const CommentSectionButtons: React.FC<CommentSectionButtonsProps> = ({
  isSameUser,
  openModal,
  id,
}) => {
  if (isSameUser)
    return (
      <>
        <div role="button" className="btn btn-edit">
          <Edit />
          <span>Edit</span>
        </div>
        <div
          role="button"
          className="btn btn-delete"
          data-testid="open-modal-delete-comment"
          onClick={() => {
            openModal();
          }}
        >
          <Delete />
          <span>Delete</span>
        </div>
      </>
    );
  return (
    <>
      <Reply />
      <span role="button">Reply </span>
    </>
  );
};

const commentSectionButtonsWithStyle = (Component: {
  Component: React.FC<CommentSectionButtonsProps>;
}) => {
  // @ts-ignore
  const WrappedComponent = (props) => {
    const [openModal, setOpenModal] = useState(false);

    return (
      <CommentSectionButtonsStyle className="reply">
        {/* @ts-ignore */}
        <Component {...props} openModal={() => setOpenModal(true)} />
        {openModal ? (
          <Modal replyId={props.id} close={() => setOpenModal(false)} />
        ) : null}
      </CommentSectionButtonsStyle>
    );
  };
  return WrappedComponent;
};

export const CommentSectionButtonsStyle = styled.div`
  grid-column: 3/ 8;
  grid-row: 3 / 4;
  color: var(--clr-blue);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  gap: 1 rem;

  .container-buttons {
    display: flex;
    gap: 3rem;
  }
  svg {
    overflow: visible;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .btn-edit {
    color: var(--clr-blue);
  }
  .btn-delete {
    color: var(--clr-red);
  }
`;
// @ts-ignore
export default commentSectionButtonsWithStyle(CommentSectionButtons);
