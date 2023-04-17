import React from 'react';
import { useSection } from '../../hooks/useSection';
import { Comment } from '../../models';
import { SectionStyles } from '../../styled-components/SectionStyles';
import { FormEdit } from '../FormEdit';
import { ReplyList } from '../ReplyList';
import { FormCreateReply } from '../ReplySection/forms';
import { SectionButtons } from './SectionButtons';
export interface CommentSectionProps {
  comment: Comment;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comment: { user, content, createdAt, score, replies, id },
}) => {
  const {
    actualScore,
    handleDecrement,
    handleIncrement,
    isDifferent,
    controlState,
    controlDispatch,
  } = useSection({ score, user });

  return (
    <>
      <SectionStyles data-testid={'list-element'}>
        <div className="header">
          <figure>
            <img
              src={user?.image?.png.replace('./', 'src/')}
              alt={'person image'}
            />
          </figure>
          <div className="username">{user?.username}</div>
          {!isDifferent && <span className="you">You</span>}
          <span>{createdAt}</span>
        </div>
        <p className="content">{content}</p>
        <div className="control">
          <button onClick={handleIncrement}>+</button>
          <span data-testid="comment-score">{actualScore}</span>
          <button onClick={handleDecrement}>-</button>
        </div>
        <SectionButtons
          isSameUser={!isDifferent}
          controlDispatch={controlDispatch}
          isComment={true}
          commentId={id}
        />
      </SectionStyles>

      {controlState.isFormEditCommentOpen && <FormEdit commentId={id} />}
      {controlState.isFormAddReplyOpen && <FormCreateReply commentId={id} />}

      {replies?.length ? <ReplyList replies={replies} commentId={id} /> : null}
    </>
  );
};

export default CommentSection;
