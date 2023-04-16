import styled from 'styled-components';
import { Reply } from '../../models';
import { ReplySection } from '../ReplySection';

const ContainerReply = styled.div`
  border-left: 1px solid var(--clr-gray-light);
  margin-left: 4rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ReplyList = ({
  replies,
  commentId,
}: {
  replies: Reply[];
  commentId: number;
}) => {
  return (
    <ContainerReply role="list">
      {replies.map((reply) => (
        <div role="listitem" key={reply.id} style={{ position: 'relative' }}>
          <ReplySection reply={reply} commentId={commentId} />
        </div>
      ))}
    </ContainerReply>
  );
};
