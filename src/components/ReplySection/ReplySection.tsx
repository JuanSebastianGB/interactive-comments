import React from 'react';
import { useSection } from '../../hooks/useSection';
import { Reply } from '../../models';
import { SectionStyles } from '../../styled-components/SectionStyles';
import { SectionButtons } from '../CommentSection/SectionButtons';
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
        <SectionButtons
          isSameUser={!isDifferent}
          controlDispatch={controlDispatch}
          isComment={false}
          replyId={id}
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
