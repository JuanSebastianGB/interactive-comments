import React, { useState } from 'react';
import { Modal } from '../../Modal';
import { OtherUserButtons, SameUserButtons } from './components';
export interface SectionButtonsProps {
  isSameUser?: boolean;
  isComment: boolean;
  replyId?: number;
  commentId?: number;
  controlDispatch: Function;
}

const SectionButtons: React.FC<SectionButtonsProps> = ({
  isSameUser,
  isComment,
  controlDispatch,
  replyId,
  commentId,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const renderModal = openModal ? (
    <Modal
      replyId={replyId}
      commentId={commentId}
      close={() => setOpenModal(false)}
    />
  ) : null;
  if (isSameUser)
    return (
      <>
        <SameUserButtons
          controlDispatch={controlDispatch}
          isComment={isComment}
          handleOpenModal={handleOpenModal}
        />
        {renderModal}
      </>
    );
  return (
    <OtherUserButtons controlDispatch={controlDispatch} isComment={isComment} />
  );
};

export default SectionButtons;
