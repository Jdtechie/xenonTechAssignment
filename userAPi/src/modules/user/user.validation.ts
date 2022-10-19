import * as CM from "../../constant/response";
import { body, param } from "express-validator";

const forgotPassword = [
  body("email")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.EMAIL)
    .isEmail()
    .withMessage(CM.REGISTER.VALIDATION.VALID_EMAIL),
];

const registration = [
  body("firstName")
    .isLength({ min: CM.USER.NAME_MIN, max: CM.USER.NAME_MAX })
    .withMessage(CM.REGISTER.VALIDATION.FIRST_NAME_LENGTH)
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.FIRST_NAME),

  body("lastName")
    .isLength({ min: CM.USER.NAME_MIN, max: CM.USER.NAME_MAX })
    .withMessage(CM.REGISTER.VALIDATION.LAST_NAME_LENGTH)
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.LAST_NAME),

  body("email")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.EMAIL)
    .isEmail()
    .withMessage(CM.REGISTER.VALIDATION.VALID_EMAIL),

  body("password")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
];

const addPost = [
  body("type").notEmpty().withMessage(CM.ADD_POST.TYPE),
  body("userId").notEmpty().withMessage(CM.ADD_POST.USER_ID),
];

const login = [
  body("email")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.EMAIL)
    .isEmail()
    .withMessage(CM.REGISTER.VALIDATION.VALID_EMAIL),
  body("password")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
];

const changePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
  body("newPassword")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
  body("confirmPassword")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
];

const createMessage = [
  body("toUserId").notEmpty().withMessage(CM.CHAT.TO_ID),
  body("message").notEmpty().withMessage(CM.CHAT.MESSAGE),
];

const getMessages = [body("toUserId").notEmpty().withMessage(CM.CHAT.TO_ID)];

const searchFriend = [
  param("search")
    .notEmpty()
    .withMessage(CM.CHAT.EMP_SEARCH)
    .isLength({ min: 3 })
    .withMessage(CM.CHAT.SEARCH),
];

const addFriend = [
  body("toRequestId").notEmpty().withMessage(CM.CHAT.FROM_REQUEST_ID),
];

const lastMessage = [
  body("userId").notEmpty().withMessage(CM.CHAT.USER_ID),
  body("toId").notEmpty().withMessage(CM.CHAT.TO_ID),
];

const editProfile = [
  body("firstName")
    .isLength({ min: CM.USER.NAME_MIN, max: CM.USER.NAME_MAX })
    .withMessage(CM.REGISTER.VALIDATION.FIRST_NAME_LENGTH)
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.FIRST_NAME),

  body("lastName")
    .isLength({ min: CM.USER.NAME_MIN, max: CM.USER.NAME_MAX })
    .withMessage(CM.REGISTER.VALIDATION.LAST_NAME_LENGTH)
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.LAST_NAME),
];

const resetPassword = [
  body("email")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.EMAIL)
    .isEmail()
    .withMessage(CM.REGISTER.VALIDATION.VALID_EMAIL),
  body("password")
    .notEmpty()
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_EMPTY)
    .isLength({ min: 8, max: 50 })
    .withMessage(CM.REGISTER.VALIDATION.PASSWORD_LENGTH),
];

export {
  registration,
  addPost,
  changePassword,
  createMessage,
  getMessages,
  lastMessage,
  forgotPassword,
  login,
  addFriend,
  resetPassword,
  searchFriend,
  editProfile,
};
