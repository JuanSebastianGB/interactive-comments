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
  return (
    <CommentsListStyle>
      {!!data ? (
        data.map((comment, idx) => (
          <CommentSection key={random()} {...comment} />
        ))
      ) : (
        <span>No comments</span>
      )}
    </CommentsListStyle>
  );
};

export const CommentsListStyle = styled.div``;

export default CommentsList;