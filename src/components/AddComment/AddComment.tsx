import React, { useState } from 'react';
import styled from 'styled-components';
import { UserComments } from '../../models';
export interface AddCommentProps {
  data: UserComments;
  submit?: Function;
}

const AddComment: React.FC<AddCommentProps> = ({ data, submit }) => {
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
    if (submit) submit({ textArea });
    setDisabled(true);
    setTextArea('');
  };
  return (
    <AddCommentStyle>
      <form aria-label="form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          onChange={handleChangeTextArea}
          value={textArea}
        />
        <img
          src={data.currentUser.image.png.replace('.', 'src')}
          alt="user image"
        />
        <button disabled={disabled}>send</button>
      </form>
    </AddCommentStyle>
  );
};

export const AddCommentStyle = styled.div``;

export default AddComment;
