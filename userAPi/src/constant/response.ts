export const API_BASE = "/v1/user";

export const USER = {
  NAME_MIN: 3,
  NAME_MAX: 100,
};

export const ADMIN = {
  ADMIN: "admin",
};

export const USER_ENUM = {
  USER: "user",
  ADMIN: "admin",
  ACTIVATED: "ACTIVATED",
  DEACTIVATED: "DEACTIVATED",
};

export const EXPIRED_TIME = {
  STAGE: "24h",
  DEVELOP: "24h",
};

export const AVATAR_PIC_TYPE = {
  PROFILE: "PROFILE",
  MESSAGE: "MESSAGE",
};

export const CHAT_TYPE = {
  MEDIA: "MEDIA",
  MESSAGE: "MESSAGE",
};

export const EXPIRED_TIME_ADMIN = {
  STAGE: "24h",
  DEVELOP: "24h",
};

export const LOGIN = {
  PASSWORD_INCORRECT: "Incorrect password, try again!",
};

export const FIELDS_NAME = {
  PASSWORD: "PASSWORD",
};
export const ADD_POST = {
  TYPE: "Type must be 'Book' or 'Post'",
  USER_ID: "User ID shoudl not be empty",
};

export const REGISTER = {
  VALIDATION: {
    FIRST_NAME_LENGTH:
      "FIRST NAME length should be between 1 to 100 characters",
    LAST_NAME_LENGTH: "LAST NAME length should be between 1 to 100 characters",
    FIRST_NAME: "First Name should not be empty",
    LAST_NAME: "Last Name should not be empty",
    EMAIL: "Email should not be empty",
    VALID_EMAIL: "Please enter valid Email",
    PASSWORD_EMPTY: "Password should not be empty",
    PASSWORD_LENGTH: "Password length must be 8 to 50",
  },
};

export const CHAT = {
  USER_ID: "User Id should  not be empty",
  TO_ID: "TO Id should  not be empty",
  FROM_ID: "FROM Id should  not be empty",
  MESSAGE: "Message should  not be empty",
  FROM_REQUEST_ID: "From Request ID should not be empty",
  TO_REQUEST_ID: "TO Request ID should not be empty",
  SEARCH: "User Name length must be at least 2 characters",
  EMP_SEARCH: "Username should  not be empty",
};

export const TABLES = {
  USER: "User",
  CHAT: "Chat",
  POSTS: "Post",
  AVATAR: "Avatar",
  FRIEND_REQUESTS: "Friend_Requests",
  COMMENTS: "Comments",
  NOTIFICATIONS: "Notifications",
};

export const ERROR = "Something went wrong";

export const KAFKA_CRED = {
  CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  BROKERS_URL: process.env.KAFKA_BROKERS_URL,
};

export const MESSAGE_RESPONSE = {
  NOTIFICATION_SENT: "Notification has been sent successfully to the user",
  MULTER_FILTER_PROFILE_ERROR: "Only .png, .jpg and .jpeg format allowed!",
  MULTER_FILTER_MESSAGE_ERROR:
    "Only .png, .jpg and .jpeg .pdf .docx format allowed!",
  RECORD_FOUND: "data found successfully",
  RECORD_ADDED: "Record Added successfully",
  RECORD_DELETED: "Record Deleted successfully",
  LOGIN_SUCCESSFULLY: "You have login successfully",
  NO_RECORD_FOUND: "No record found",
  ERROR_IN_PERFORMING_OPERATION: "Error in performing operation",
  ACCOUNT_DEACTIVATED: "Your Account has been Deactivated",
  USER_EXIST: "User already exist",
  ADMIN_EXIST: "Admin already exist",
  REGISTER_SUCCESSFULLY: "User registered successfully",
  WROONG_INPUT: "Enter correct details",
  INCORRECT_PASSWORD: "Enter correct password",
  POST_ADDED: "Post added successfully",
  POST_DELETED: "Post has been deleted successfully",
  USER_DELETED: "User has been deleted successfully",
  MESSAGE_CREATED: "Message sent successfully",
  LAST_MESSAGE_FOUND: "Last message found",
  PASSWORD_CHANGED: "Password has been changed successfully",
  PASSWORD_UPDATED: "Password has been updated successfully",
  PASSWORD_RESET_LINK_SENT: "Password reset link has been sent to your email",
  FRIEND_ADDED: "Friend is added successfully",
  REQUEST_ALREADY_SENT: "Friend Request already sent",
  COMMENT_ADDED_SUCCESS: "Your Comment has been added successfully",
  RECORD_UPDATED: "Record updated successfully",
  INVALID_USER: "Invalid user..",
};

export const POST_TYPE = {
  POST: "post",
  BOOK: "book",
};
export const CHAT_STATUS = {
  READ: "READ",
  UNREAD: "UNREAD",
};

export const POST_STATUS = {
  PUBLISHED: "PUBLISHED",
  UN_PUBLISHED: "UNPUBLISHED",
};

export const FRIEND_REQUEST_STATUS = {
  ACCEPTED: "ACCEPTED",
  PENDING: "PENDING",
  CANCELED: "CANCELLED",
};

export const NOTIFICATION_STATUS = {
  MESSAGE: "MESSAGE",
  FRIEND_REQUEST: "REQUEST",
  READ: "READ",
  UNREAD: "UNREAD",
  // CANCELED: "CANCELLED",
};

export const TOPICS = {};

export const MIDDLEWARE_RESPONSE = {
  JWTERROR: "Session has been expired",
  MULTER_FILTER_ERROR: "Only .png, .jpg and .jpeg format allowed!",
  WALLET_ZCH: process.env.WALLET_ZCH,
  WALLET_ETH: process.env.WALLET_ETH,
  TRADINGMAIN: process.env.TRADINGMAIN,
  WALLET_USD: process.env.WALLET_USD,
  PERMISSION_DENIED: "Permission has been denied for this user",
  MISSMATCHED_FIELDS: "Missmatched fields please try again",
};

export const RESPONSES = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOCONTENT: 204,
  BADREQUEST: 400,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  TIMEOUT: 408,
  TOOMANYREQ: 429,
  INTERNALSERVER: 500,
  BADGATEWAYS: 502,
  SERVICEUNAVILABLE: 503,
  GATEWAYTIMEOUT: 504,
};

export const PAGINATION = {
  LIMIT_VALUE: 10,
  OFFSET_VALUE: 0,
};

export const multerImageType = {
  Profile: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
  Message: [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/docs",
    "application/pdf",
  ],
};
