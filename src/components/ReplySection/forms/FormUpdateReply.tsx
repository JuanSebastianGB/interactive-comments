import React, { useMemo, useState } from 'react';
import { useUserContext } from '../../../context';
import { FlexRow } from '../../../styled-components';
import { FormStyle } from '../../../styled-components/FormStyle';
import { type } from '../../../types/type';
export interface Props {
  commentId: number;
  id: number;
}

const FormUpdateReply: React.FC<Props> = ({ commentId, id }) => {
  const { apiState, dispatch } = useUserContext();
  const actualReply = useMemo(() => {
    const comment = apiState.comments.find(
      (comment) => comment.id === commentId
    );
    return comment?.replies?.find((reply) => reply.id === id);
  }, [apiState.comments]);
  const [textArea, setTextArea] = useState(() => {
    return actualReply?.content;
  });
  const [disabled, setDisabled] = useState(true);

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
    const actualReply = comment?.replies?.find((reply) => reply.id === id);
    const updatedReply = {
      ...actualReply,
      content: textArea,
      commentId,
    };
    dispatch({ type: type.EDIT_REPLY, payload: updatedReply });
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

export default FormUpdateReply;
