import React, { useState } from 'react';
import { SectionButtonsStyle } from '../../../styled-components/SectionButtonsStyles';
import { controlType } from '../../../types/type';
import { Modal } from '../../Modal';
import { Reply } from '../../icons';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
export interface CommentSectionButtonsProps {
  isSameUser?: boolean;
  openModal: Function;
  isComment: boolean;
}

const CommentSectionButtons: React.FC<CommentSectionButtonsProps> = ({
  isSameUser,
  openModal,
  isComment,
  constrolState,
  controlDispatch,
}) => {
  if (isSameUser)
    return (
      <>
        <div role="button" className="btn btn-edit">
          <Edit />
          <span
            onClick={() => {
              if (isComment)
                controlDispatch({ type: controlType.OPEN_FORM_EDIT_COMMENT });
              else controlDispatch({ type: controlType.OPEN_FORM_EDIT_REPLY });
            }}
          >
            Edit
          </span>
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
    <div className="btn btn-reply">
      <Reply />
      <button
        onClick={() => {
          if (isComment)
            controlDispatch({ type: controlType.OPEN_FORM_ADD_REPLY });
        }}
      >
        Reply
      </button>
    </div>
  );
};

const commentSectionButtonsWithStyle = (Component: {
  Component: React.FC<CommentSectionButtonsProps>;
}) => {
  // @ts-ignore
  const WrappedComponent = (props) => {
    const [openModal, setOpenModal] = useState(false);

    return (
      <SectionButtonsStyle className="reply">
        {/* @ts-ignore */}
        <Component {...props} openModal={() => setOpenModal(true)} />
        {openModal ? (
          <Modal replyId={props.id} close={() => setOpenModal(false)} />
        ) : null}
      </SectionButtonsStyle>
    );
  };
  return WrappedComponent;
};

// @ts-ignore
export default commentSectionButtonsWithStyle(CommentSectionButtons);
