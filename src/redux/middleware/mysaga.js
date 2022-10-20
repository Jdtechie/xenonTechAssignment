import { call, put, take, takeEvery } from "redux-saga/effects";
import * as callApi from "../service";

function* login(action) {
  try {
    console.log(`ACTION::`, action.payload);
    const user = yield call(callApi.loginAPI, action.payload);
    console.log("user", user);
    yield put({ type: "USER_LOGIN", userToken: user?.response.data.token });
  } catch (e) {
    yield put({ type: "USER_FAILED", message: e.message });
  }
}
function* signUp(action) {
  try {
    console.log(`ACTION::`, action.payload);
    const user = yield call(callApi.signupAPI, action.payload);
    console.log("user", user);
    yield put({ type: "USER_SIGNUP", userToken: user?.response.data.token });
  } catch (e) {
    yield put({ type: "USER_FAILED", message: e.message });
  }
}

function* getAllUser(action) {
  try {
    console.log(`ACTION::`, action);
    const allUser = yield call(callApi.getAllUser);
    console.log("user", allUser);
    yield put({
      type: "ALL_USER",
      allUser: allUser.response.data.data ? allUser.response.data.data : [],
    });
  } catch (e) {
    yield put({ type: "USER_FAILED", message: e.message });
  }
}
// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* mySaga() {
  yield takeEvery("USER_LOGIN_REQUESTED", login);
  yield takeEvery("USER_SIGNUP_REQUESTED", signUp);
  yield takeEvery("ALL_USER_REQUESTED", getAllUser);
}
