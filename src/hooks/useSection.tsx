import { useMemo, useReducer, useState } from 'react';
import { useUserContext } from '../context';
import { User } from '../models';
import { formControlReducer } from '../reducers/formControlReducer';

export const useSection = ({ score, user }: { score: number; user: User }) => {
  const [actualScore, setActualScore] = useState(score ?? 0);
  const { apiState } = useUserContext();
  const isDifferent = useMemo(() => {
    return apiState.currentUser?.username !== user?.username;
  }, [apiState.currentUser?.username, user?.username]);
  const handleDecrement = () =>
    setActualScore((prev) => (prev === 0 ? 0 : prev - 1));
  const handleIncrement = () => setActualScore((prev) => prev + 1);
  const [controlState, controlDispatch] = useReducer(formControlReducer, {
    isFormAddCommentOpen: false,
    isFormEditCommentOpen: false,
    isFormAddReplyOpen: false,
    isFormEditReplyOpen: false,
  });

  return {
    isDifferent,
    handleDecrement,
    handleIncrement,
    actualScore,
    controlState,
    controlDispatch,
  };
};
