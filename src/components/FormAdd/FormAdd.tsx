import React, { useState } from 'react';
import { useUserContext } from '../../context';
import { timeSince } from '../../helpers/date.helper';
import { FlexRow } from '../../styled-components';
import { FormStyle } from '../../styled-components/FormStyle';
import { type } from '../../types/type';
export interface FormAddProps {
  isComment?: boolean;
  commentId?: number;
}

const FormAdd: React.FC<FormAddProps> = ({ isComment = true, commentId }) => {
  const { apiState, dispatch } = useUserContext();
  const [textArea, setTextArea] = useState('');
  const [disabled, setDisabled] = useState(true);
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentTextArea = e.target.value;
    if (currentTextArea.length > 4) setDisabled(false);
    else setDisabled(true);
    setTextArea(currentTextArea);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isComment) {
      const newComment = {
        content: textArea,
        id: apiState.comments.length + 1,
        user: apiState.currentUser,
        score: 0,
        replies: [],
        createdAt: timeSince(new Date()),
      };
      dispatch({ type: type.ADD_COMMENT, payload: newComment });
    } else {
      const newReply = {
        commentId,
        content: textArea,
        id: apiState.comments.length + 1,
        user: apiState.comments.find((comment) => comment.id === commentId)
          ?.user,
        score: 0,
        replies: [],
        createdAt: timeSince(new Date()),
      };
      dispatch({ type: type.ADD_REPLY, payload: newReply });
    }
  };
  return (
    <FormStyle>
      <form aria-label="form" onSubmit={handleSubmit}>
        <textarea
          name="textArea"
          placeholder={!isComment ? 'Add a reply' : 'Add a comment...'}
          onChange={handleChangeTextArea}
          value={textArea}
        />
        <FlexRow className="flex-row">
          <img
            src={apiState?.currentUser?.image?.png.replace('.', 'src')}
            alt="user image"
          />
          <button disabled={disabled}>{!isComment ? 'REPLY' : 'SEND'}</button>
        </FlexRow>
      </form>
    </FormStyle>
  );
};

export default FormAdd;
