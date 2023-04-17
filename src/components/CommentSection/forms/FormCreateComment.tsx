import React, { useState } from 'react';
import { timeSince } from '../../../helpers/date.helper';
import { useLocalStorage } from '../../../hooks';
import { FlexRow } from '../../../styled-components';
import { FormStyle } from '../../../styled-components/FormStyle';
import { type } from '../../../types/type';
export interface FormAddProps {
  commentId?: number;
}

const FormCreateComment: React.FC<FormAddProps> = () => {
  const { apiState, dispatch } = useLocalStorage();
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
    const newComment = {
      content: textArea,
      id: apiState.comments.length + 1,
      user: apiState.currentUser,
      score: 0,
      replies: [],
      createdAt: timeSince(new Date()),
    };
    dispatch({ type: type.ADD_COMMENT, payload: newComment });
    setDisabled(false);
    setTextArea('');
  };

  return (
    <FormStyle>
      <form aria-label="form" onSubmit={handleSubmit}>
        <textarea
          name="textArea"
          placeholder="Add a comment..."
          onChange={handleChangeTextArea}
          value={textArea}
        />
        <FlexRow className="flex-row">
          <img
            src={apiState?.currentUser?.image?.png.replace('.', 'src')}
            alt="user image"
          />
          <button disabled={disabled}>SEND</button>
        </FlexRow>
      </form>
    </FormStyle>
  );
};

export default FormCreateComment;
