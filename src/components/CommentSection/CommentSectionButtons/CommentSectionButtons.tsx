import React from 'react';
import styled from 'styled-components';
import { Reply } from '../../icons';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
export interface CommentSectionButtonsProps {
  isReply?: boolean;
  isDifferentUser?: boolean;
}

const CommentSectionButtons: React.FC<CommentSectionButtonsProps> = ({
  isReply,
  isDifferentUser,
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
        <div role="button" className="btn btn-delete">
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
    return (
      <CommentSectionButtonsStyle className="reply">
        {/* @ts-ignore */}
        <Component {...props} />
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
