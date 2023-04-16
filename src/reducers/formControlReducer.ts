import { controlType } from '../types/type';

export const formControlReducer = (
  state: {
    isFormAddCommentOpen: boolean;
    isFormEditCommentOpen: boolean;
    isFormAddReplyOpen: boolean;
    isFormEditReplyOpen: boolean;
  },
  action: { type: string }
) => {
  switch (action.type) {
    case controlType.OPEN_FORM_EDIT_COMMENT:
      return {
        ...state,
        isFormAddCommentOpen: false,
        isFormEditCommentOpen: true,
        isFormAddReplyOpen: false,
        isFormEditReplyOpen: false,
      };
    case controlType.CLOSE_FORM_EDIT_COMMENT:
      return {
        ...state,
        isFormEditCommentOpen: false,
      };
    case controlType.OPEN_FORM_ADD_REPLY:
      return {
        ...state,
        isFormAddCommentOpen: false,
        isFormEditCommentOpen: false,
        isFormAddReplyOpen: true,
        isFormEditReplyOpen: false,
      };
    case controlType.CLOSE_FORM_ADD_REPLY:
      return {
        ...state,
        isFormAddReplyOpen: false,
      };
    case controlType.OPEN_FORM_EDIT_REPLY:
      return {
        ...state,
        isFormAddCommentOpen: false,
        isFormEditCommentOpen: false,
        isFormAddReplyOpen: false,
        isFormEditReplyOpen: true,
      };
    case controlType.CLOSE_FORM_EDIT_REPLY:
      return {
        ...state,
        isFormEditReplyOpen: false,
      };
    default:
      return state;
  }
};
