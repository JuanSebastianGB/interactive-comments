export interface UserComments {
  currentUser: CurrentUser;
  comments: Comment[];
}

export interface CurrentUser {
  image: Image;
  username: string;
}

export interface Image {
  png: string;
  webp: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}

export interface User {
  image: Image2;
  username: string;
}

export interface Image2 {
  png: string;
  webp: string;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User2;
}

export interface User2 {
  image: Image3;
  username: string;
}

export interface Image3 {
  png: string;
  webp: string;
}
