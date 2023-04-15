import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context';
import { Comment } from '../../models';
import { AddComment } from '../AddComment';
import { ReplyList } from '../ReplyList';
import { CommentSectionButtons } from './CommentSectionButtons';
export interface CommentSectionProps extends Comment {
  isReply?: boolean;
  replyingTo?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  user,
  content,
  createdAt,
  score,
  replies,
  isReply,
  id,
  replyingTo,
}) => {
  const handleDecrement = () => {
    setActualScore((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const handleIncrement = () => {
    setActualScore((prev) => prev + 1);
  };
  const [actualScore, setActualScore] = useState(score ?? 0);
  const { apiState } = useUserContext();
  const isDifferent = apiState.currentUser?.username !== user?.username;
  const [isReplyAction, setIsReplyAction] = useState(false);
  const toggleReplyAction = () => setIsReplyAction((prev) => !prev);
  return (
    <>
      <CommentSectionStyle
        data-testid={'list-element'}
        role={`${isReply ? 'cell' : ''}`}
        className={isReply ? 'is-reply' : ''}
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
          isReply={Boolean(isReply)}
          id={id}
          toggleReplyAction={toggleReplyAction}
          isReplyAction={isReplyAction}
        />
      </CommentSectionStyle>
      {isReplyAction && (
        <AddComment
          isReplyAction={isReplyAction}
          toggleReplyAction={toggleReplyAction}
          id={id}
          user={user}
        />
      )}

      {replies?.length ? <ReplyList replies={replies} /> : null}
    </>
  );
};

export const CommentSectionStyle = styled.div`
  &.is-reply {
    margin-left: 2rem;
  }
  display: grid;
  grid-template-columns: 65px repeat(6, 1fr);
  border-radius: 1rem;
  padding: 1.2rem;
  font-size: 1.2rem;
  min-width: 100%;
  margin: 0 auto;
  background-color: var(--clr-white);
  .color-blue {
    color: var(--clr-blue);
  }
  .header {
    grid-column: 1 / 8;
    grid-row: 1 / 2;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1.2rem;
    span {
      color: var(--clr-gray);
    }
    figure {
      width: 2.5rem;
    }
    img {
      width: 100%;
    }
    .you {
      color: var(--clr-white);
      background-color: var(--clr-blue);
      padding: 0.2rem 0.7rem;
    }
  }
  .content {
    grid-column: 1 / 8;
    grid-row: 2 / 3;
    margin: 1rem 0;
    color: var(--clr-gray);
  }
  .control {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 0.3rem;
    background-color: #f5f6fa;
    & > button {
      width: 2rem;
      height: 2rem;
      color: var(--clr-gray-light);
      background-color: inherit;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
    }
    & > span {
      color: var(--clr-blue);
      font-weight: 700;
    }
  }

  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .username {
    color: var(--clr-dark);
    font-weight: 700;
  }

  @media (min-width: 750px) {
    .header {
      grid-column: 2 / 6;
      grid-row: 1 / 2;
    }
    .content {
      grid-column: 2 / 8;
      grid-row: 2 / 3;
    }
    .reply {
      grid-column: 6 / 8;
      grid-row: 1/ 2;
    }
    .control {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
      display: flex;
      flex-direction: column;
      max-width: 45%;
      height: 80%;
    }
  }

  @media (min-width: 800px) {
    max-width: 800px;
  }
`;

export default CommentSection;
