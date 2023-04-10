import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as random } from 'uuid';
import { Comment } from '../../models';
import { CommentSection } from '../CommentSection';
export interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const [data, setData] = useState(comments);
  const renderedComments = !!data ? (
    data.map((comment) => <CommentSection key={random()} {...comment} />)
  ) : (
    <span>No comments</span>
  );
  return <CommentsListStyle role="row">{renderedComments}</CommentsListStyle>;
};

export const CommentsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default CommentsList;
