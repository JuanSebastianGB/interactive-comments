import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../../context';
import { Modal } from '../../Modal';
import { Reply } from '../../icons';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
export interface CommentSectionButtonsProps {
  isReply?: boolean;
  isDifferentUser?: boolean;
  openModal: Function;
  id: number;
}

const CommentSectionButtons: React.FC<CommentSectionButtonsProps> = ({
  isReply,
  isDifferentUser,
  openModal,
  id,
}) => {
  if (!isReply || (isDifferentUser && isReply))
    return (
      <>
        <Reply />
        <span role="button">Reply </span>
      </>
    );
  if (!isDifferentUser && isReply)
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
          onClick={() => openModal()}
        >
          <Delete />
          <span>Delete</span>
        </div>
      </>
    );
  return <></>;
};

const commentSectionButtonsWithStyle = (Component: {
  Component: React.FC<CommentSectionButtonsProps>;
}) => {
  // @ts-ignore
  const WrappedComponent = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const { setApiState, apiState } = useUserContext();

    const updateState = (id: number) => {
      setApiState((prev) => ({
        ...prev,
        comments: prev.comments.filter((actual) => actual.id !== id),
      }));
    };
    return (
      <CommentSectionButtonsStyle className="reply">
        {/* @ts-ignore */}
        <Component {...props} openModal={() => setOpenModal(true)} />
        {openModal ? <Modal close={() => setOpenModal(false)} /> : null}
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
