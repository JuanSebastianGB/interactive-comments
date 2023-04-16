import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context';
import { timeSince } from '../../helpers/date.helper';
import { User } from '../../models';
import { FlexRow } from '../../styled-components';
import { type } from '../../types/type';
export interface UpdateCommentProps {
  submit?: Function;
  isReplyAction?: boolean;
  toggleReplyAction?: Function;
  id: number;
  user: User;
}

const UpdateComment: React.FC<UpdateCommentProps> = ({
  submit,
  isReplyAction,
  toggleReplyAction,
  id: commentId,
}) => {
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
    if (submit) submit({ textArea });

    if (!isReplyAction)
      dispatch({
        type: type.ADD_COMMENT,
        payload: {
          content: textArea,
          id: apiState.comments.length + 1,
          user: apiState.currentUser,
          score: 0,
          replies: [],
          createdAt: timeSince(new Date()),
        },
      });
    else
      dispatch({
        type: type.ADD_REPLY,
        payload: {
          commentId,
          content: textArea,
          score: 0,
          createdAt: timeSince(new Date()),
          user: apiState.currentUser,
          replyInto: apiState.currentUser.username,
          id:
            (apiState?.comments?.find((c) => c.id === commentId)?.replies
              ?.length ?? 1000) + 1,
        },
      });
    toggleReplyAction && toggleReplyAction();
    setDisabled(true);
    setTextArea('');
  };
  return (
    <AddCommentStyle>
      <form aria-label="form" onSubmit={handleSubmit}>
        <textarea
          name="textArea"
          placeholder={isReplyAction ? 'Add a reply' : 'Add a comment...'}
          onChange={handleChangeTextArea}
          value={textArea}
        />
        <FlexRow className="flex-row">
          <img
            src={apiState?.currentUser?.image?.png.replace('.', 'src')}
            alt="user image"
          />
          <button disabled={disabled}>
            {isReplyAction ? 'REPLY' : 'SEND'}
          </button>
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

export default UpdateComment;
