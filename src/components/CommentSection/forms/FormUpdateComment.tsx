import React, { useState } from 'react';
import { useUserContext } from '../../../context';
import { FlexRow } from '../../../styled-components';
import { FormStyle } from '../../../styled-components/FormStyle';
import { type } from '../../../types/type';
export interface FormAddProps {
  commentId?: number;
}

const FormUpdateComment: React.FC<FormAddProps> = ({ commentId }) => {
  const { apiState, dispatch } = useUserContext();
  const [textArea, setTextArea] = useState(
    () =>
      apiState.comments.find((comment) => comment.id === commentId)?.content ||
      ''
  );
  const [disabled, setDisabled] = useState(true);
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentTextArea = e.target.value;
    if (currentTextArea.length > 4) setDisabled(false);
    else setDisabled(true);
    setTextArea(currentTextArea);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const prevComment = apiState.comments.find(
      (comment) => comment.id === commentId
    );
    const newComment = {
      ...prevComment,
      content: textArea,
    };
    dispatch({ type: type.EDIT_COMMENT, payload: newComment });
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
          <button disabled={disabled}>UPDATE</button>
        </FlexRow>
      </form>
    </FormStyle>
  );
};

export default FormUpdateComment;
