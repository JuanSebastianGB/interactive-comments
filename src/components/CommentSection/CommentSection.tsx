import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context';
import { Comment } from '../../models';
import { ReplyList } from '../ReplyList';
import { CommentSectionButtons } from './CommentSectionButtons';
export interface CommentSectionProps extends Comment {
  isReply?: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  user,
  content,
  createdAt,
  score,
  replies,
  isReply,
  id,
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
          <span>{createdAt}</span>
        </div>
        <p className="content">{content}</p>
        <div className="control">
          <button onClick={handleIncrement}>+</button>
          <span data-testid="comment-score">{actualScore}</span>
          <button onClick={handleDecrement}>-</button>
        </div>
        <CommentSectionButtons
          isDifferentUser={isDifferent}
          isReply={Boolean(isReply)}
          id={id}
        />
      </CommentSectionStyle>
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
  /* max-width: 100%; */
  min-width: 100%;
  margin: 0 auto;
  background-color: var(--clr-white);

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
