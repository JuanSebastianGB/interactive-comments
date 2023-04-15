import { UserComments } from './cooments.model';

export interface UserContextType {
  apiState: UserComments;
  dispatch: Function;
}
