import React, { useState } from 'react';
import styled from 'styled-components';
import { Reply } from '../icons';
export interface CommentSectionProps {
  username: string;
  content: string;
  createdAt: string;
  image: string;
  score: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  username,
  content,
  createdAt,
  image,
  score,
}) => {
  const handleDecrement = () => {
    setActualScore((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const handleIncrement = () => {
    setActualScore((prev) => prev + 1);
  };
  const [actualScore, setActualScore] = useState(score ?? 0);
  return (
    <CommentSectionStyle>
      <div className="header">
        <figure>
          <img src={image} alt={'person image'} />
        </figure>
        <div className="username">{username}</div>
        <span>{createdAt}</span>
      </div>
      <p className="content">{content}</p>
      <div className="control">
        <button onClick={handleIncrement}>+</button>
        <span data-testid="comment-score">{actualScore}</span>
        <button onClick={handleDecrement}>-</button>
      </div>
      <div className="reply">
        <Reply />
        <span>Reply</span>
      </div>
    </CommentSectionStyle>
  );
};

export const CommentSectionStyle = styled.div`
  display: grid;
  grid-template-columns: 65px repeat(6, 1fr);
  background-color: var(--clr-white);
  border-radius: 1rem;
  padding: 1.2rem;
  font-size: 1.2rem;
  max-width: 100%;
  margin: 0 auto;
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
    }
    & > span {
      color: var(--clr-blue);
      font-weight: 700;
    }
  }
  .reply {
    grid-column: 6 / 8;
    grid-row: 3 / 4;
    color: var(--clr-blue);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
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

  @media (min-width: 650px) {
    .header {
      grid-column: 2 / 7;
      grid-row: 1 / 2;
    }
    .content {
      grid-column: 2 / 8;
      grid-row: 2 / 3;
    }
    .reply {
      grid-column: 7 / 8;
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
