import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context';
import { timeSince } from '../../helpers/date.helper';
import { UserComments } from '../../models';
import { FlexRow } from '../../styled-components';
import { type } from '../../types/type';
export interface AddCommentProps {
  data: UserComments;
  submit?: Function;
}

const AddComment: React.FC<AddCommentProps> = ({ data, submit }) => {
  const { apiState } = useUserContext();
  const [textArea, setTextArea] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { dispatch } = useUserContext();
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentTextArea = e.target.value;
    if (currentTextArea.length > 4) setDisabled(false);
    else setDisabled(true);
    setTextArea(currentTextArea);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submit) submit({ textArea });
    dispatch({
      type: type.ADD_COMMENT,
      payload: {
        content: textArea,
        id: 100,
        user: apiState.currentUser,
        score: 0,
        replies: [],
        createdAt: timeSince(new Date()),
      },
    });
    setDisabled(true);
    setTextArea('');
  };
  return (
    <AddCommentStyle>
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
          <button disabled={disabled}>send</button>
        </FlexRow>
      </form>
    </AddCommentStyle>
  );
};

export const AddCommentStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  [name='textArea'] {
    width: 100%;
    height: 8rem;
    padding: 1rem 1.8rem;
    border-radius: 1rem;
    border: thin solid var(--clr-gray-light);
    resize: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--clr-gray);
      font-size: 1rem;
    }
  }
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
  button {
    background-color: var(--clr-blue);
    color: var(--clr-white);
    text-transform: uppercase;
    padding: 0.5rem 1.6rem;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  background-color: var(--clr-white);
  border-radius: 1rem;
  padding: 1.2rem 1.3rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  .flex-row {
    margin-top: 1rem;
  }
`;

export default AddComment;
