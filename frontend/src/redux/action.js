async function login(payload) {
  console.log(`SECOND STEP (ACTIONS AND ADD TYPE INTO PAYLOAD)::`, payload);
  return { payload, type: "USER_LOGIN_REQUESTED" };
}

function signUp(payload) {
  console.log("SECOND STEP (ACTION AND ADD TYPE INTO PAYLOAD)::", payload);

  return { payload, type: "USER_SIGNUP_REQUESTED" };
}

function allUser() {
  console.log("SECOND STEP (ACTION AND ADD TYPE INTO PAYLOAD)::");

  return { type: "ALL_USER_REQUESTED" };
}
export { login, signUp, allUser };
