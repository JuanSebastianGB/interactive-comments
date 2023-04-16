import React from 'react';
import { useSection } from '../../hooks/useSection';
import { Reply } from '../../models';
import { SectionStyles } from '../../styled-components/SectionStyles';
import { CommentSectionButtons } from '../CommentSection/CommentSectionButtons';
import { FormAdd } from '../FormAdd';
import FormUpdateReply from './forms/FormUpdateReply';

export interface CommentSectionProps {
  reply: Reply;
  commentId: number;
}

const ReplySection: React.FC<CommentSectionProps> = ({
  reply: { content, createdAt, id, replyingTo, score, user },
  commentId,
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
      <SectionStyles
        data-testid={'list-element'}
        role="cell"
        className="is-reply"
      >
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
        <p className="content">
          {replyingTo && (
            <span className="color-blue">{`@${replyingTo} `}</span>
          )}
          {content}
        </p>
        <div className="control">
          <button onClick={handleIncrement}>+</button>
          <span data-testid="comment-score">{actualScore}</span>
          <button onClick={handleDecrement}>-</button>
        </div>
        <CommentSectionButtons
          isSameUser={!isDifferent}
          controlState={controlState}
          controlDispatch={controlDispatch}
          isComment={false}
        />
      </SectionStyles>
      {controlState.isFormEditReplyOpen && (
        <FormUpdateReply id={id} commentId={commentId} />
      )}
      {controlState.isFormAddReplyOpen && (
        <FormAdd isComment={false} commentId={id} />
      )}
    </>
  );
};

export default ReplySection;
