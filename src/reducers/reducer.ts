import { CurrentUser, UserComments } from '../models';
import { type } from '../types/type';

interface ActionType {
  type: string;
  payload?: any;
}

export const initialState: UserComments = {
  comments: [],
  currentUser: {} as CurrentUser,
};

export const reducer = (state: UserComments, action: ActionType) => {
  switch (action.type) {
    case type.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case type.REMOVE_ALL_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case type.DELETE_REPLY:
      return {
        ...state,
        comments: state.comments.map((comment) => ({
          ...comment,
          replies:
            comment.replies?.filter((reply) => reply.id !== action.payload) ??
            [],
        })),
      };
    case type.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case type.ADD_REPLY:
      const { commentId, ...newReply } = action.payload;
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, newReply]
              : [newReply],
          };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedComments,
      };

    default:
      return state;
  }
};
