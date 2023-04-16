import React from 'react';
import styled from 'styled-components';
import { v4 as random } from 'uuid';
import { useUserContext } from '../../context';
import { CommentSection } from '../CommentSection';
export interface CommentsListProps {}

const CommentsList: React.FC<CommentsListProps> = () => {
  const { apiState } = useUserContext();
  const renderedComments = !!apiState?.comments ? (
    apiState?.comments.map((comment) => (
      <CommentSection key={random()} comment={comment} />
    ))
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
