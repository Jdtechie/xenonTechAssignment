import { getValue } from "@testing-library/user-event/dist/utils";

const initialState = {
  userToken: false,
  isLoggedIn: false,
};
function commonReducer(userObj = initialState, action) {
  console.log("THIRD STEP (REDUCER TO STORAGE)::", action);
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...userObj,
        userToken: action.userToken ? action.userToken : false,
        isLoggedIn: action.userToken ? true : false,
      };
      break;
    case "USER_SIGNUP":
      return {
        ...userObj,
        userToken: action.userToken ? action.userToken : false,
        isSignedUp: action.userToken ? true : false,
      };
      break;
    case "ALL_USER":
      return {
        ...userObj,
        userData: action.allUser,
      };
      break;
    default:
      return userObj;
  }
}

function allUser(userData = [], action) {
  console.log("THIRD STEP (REDUCER TO STORAGE)::", action);
  switch (action.type) {
    case "ALL_USER":
      return {
        userData: action.allUser,
      };
    default:
      return userData;
  }
}
export { commonReducer, allUser };
