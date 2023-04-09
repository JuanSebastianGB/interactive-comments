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
    <CommentSectionStyle className="comment">
      <div className="header">
        <figure>
          <img src={image} alt={'person image'} />
        </figure>
        <div className="username">{username}</div>
        <span>{createdAt}</span>
      </div>
      <p>{content}</p>
      <section>
        <div className="control">
          <button onClick={handleIncrement}>+</button>
          <span data-testid="comment-score">{actualScore}</span>
          <button onClick={handleDecrement}>-</button>
        </div>
        <div className="reply">
          <Reply />
          <span>Reply</span>
        </div>
      </section>
    </CommentSectionStyle>
  );
};

export const CommentSectionStyle = styled.div`
  background-color: var(--clr-white);
  border-radius: 1rem;
  padding: 1.2rem;
  font-size: 1.2rem;
  .header {
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
  .username {
    color: var(--clr-dark);
    font-weight: 700;
  }
  p {
    margin: 1rem 0;
    color: var(--clr-gray);
  }
  .control {
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
    color: var(--clr-blue);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default CommentSection;
