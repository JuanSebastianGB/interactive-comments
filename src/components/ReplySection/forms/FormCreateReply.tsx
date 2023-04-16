import React, { useCallback, useState } from 'react';
import { useUserContext } from '../../../context';
import { timeSince } from '../../../helpers/date.helper';
import { Reply } from '../../../models';
import { FlexRow } from '../../../styled-components';
import { FormStyle } from '../../../styled-components/FormStyle';
import { type } from '../../../types/type';
export interface FormAddProps {
  commentId: number;
}

const findMaxReplyId = (replies: Reply[]) =>
  replies.reduce((acc, reply) => {
    if (reply.id > acc) return reply.id;
    return acc;
  }, 0);

const FormCreateReply: React.FC<FormAddProps> = ({ commentId }) => {
  const { apiState, dispatch } = useUserContext();
  const [textArea, setTextArea] = useState('');
  const [disabled, setDisabled] = useState(true);
  const computeMaxReplyId = useCallback(findMaxReplyId, [apiState.comments]);
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentTextArea = e.target.value;
    if (currentTextArea.length > 4) setDisabled(false);
    else setDisabled(true);
    setTextArea(currentTextArea);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = apiState.comments.find(
      (comment) => comment.id === commentId
    );
    const replies = comment?.replies ?? [];
    const newReply: Reply = {
      content: textArea,
      id: computeMaxReplyId(replies) + 1,
      user: apiState.currentUser,
      score: 0,
      createdAt: timeSince(new Date()),
      replyingTo: comment?.user?.username ?? '',
    };
    dispatch({ type: type.ADD_REPLY, payload: { commentId, ...newReply } });
    setDisabled(false);
    setTextArea('');
  };
  return (
    <FormStyle>
      <form aria-label="form" onSubmit={handleSubmit}>
        <textarea
          name="textArea"
          placeholder="Add a reply..."
          onChange={handleChangeTextArea}
          value={textArea}
        />
        <FlexRow className="flex-row">
          <img
            src={apiState?.currentUser?.image?.png.replace('.', 'src')}
            alt="user image"
          />
          <button disabled={disabled}>REPLY</button>
        </FlexRow>
      </form>
    </FormStyle>
  );
};

export default FormCreateReply;
