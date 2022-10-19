import { stringList } from "aws-sdk/clients/datapipeline";

interface GET_ALL_POST_RESPONSE {
  [index: number]: {
    id: number;
    userID: number;
    title: string;
    description: string;
    type: string;
    status: string;
    createAt: Date;
    updatedAt: Date;
  };
  totalResults: number;
}

interface GET_ALL_BOOK_RESPONSE {
  [index: number]: {
    id: number;
    userID: number;
    title: string;
    description: string;
    type: string;
    status: string;
    createAt: Date;
    updatedAt: Date;
  };
  totalResults: number;
}

interface GET_USER_RESPONSE {
  [index: number]: {
    id: number;
    fistName: string;
    lastName: string;
    email: string;
    password: string;
    randomString?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  totalResults: number;
}

interface ADD_NEW_USER_PAYLOAD {
  fistName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

interface ADD_NEW_POST_PAYLOAD {
  userId: number;
  title: string;
  description: string;
  type: string;
  status: string;
}

interface DELETE_POST_PAYLOAD {
  userId: number;
  postId: number;
}

// interface ADD_FRIEND_PAYLOAD {
//   fromRequestId: number;
//   toRequestId: number;
// }
interface ADD_NEW_MESSAGE {
  userId?: number;
  toUserId: number;
  message: string;
  token?: string;
}

interface USER_LOGIN_PAYLOAD {
  password: string;
  email: string;
}
interface COMMON_LIMIT_OFFSET {
  limit: number;
  offset: number;
}

interface ADD_COMMENTS_PAYLOAD {
  postId: number;
  comment: string;
}

interface EDIT_PROFILE_PAYLOAD {
  firstName: string;
  lastName: string;
}

interface SEND_NOTIFICATION_PAYLOAD {
  fromUserId: number;
  toUserId: number;
  type: string;
  requestType: string;
}

interface ALL_USER_SEARCH_FILTER_PAYLOAD {
  searchBy?: string;
  toDate?: string;
  fromDate?: string;
}

interface DELETE_NOTIFICATION {
  fromRequestId: number;
  toRequestId: number;
}
interface CANCEL_FRIEND_REQUEST_PAYLOAD {
  userId: number;
  toUserId: number;
}

export {
  GET_ALL_POST_RESPONSE,
  GET_ALL_BOOK_RESPONSE,
  ADD_NEW_USER_PAYLOAD,
  COMMON_LIMIT_OFFSET,
  GET_USER_RESPONSE,
  ADD_NEW_POST_PAYLOAD,
  DELETE_POST_PAYLOAD,
  ADD_NEW_MESSAGE,
  USER_LOGIN_PAYLOAD,
  ADD_COMMENTS_PAYLOAD,
  ALL_USER_SEARCH_FILTER_PAYLOAD,
  EDIT_PROFILE_PAYLOAD,
  SEND_NOTIFICATION_PAYLOAD,
  DELETE_NOTIFICATION,
  CANCEL_FRIEND_REQUEST_PAYLOAD,
  // ADD_FRIEND_PAYLOAD,
};
