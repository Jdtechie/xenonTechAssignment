import { Toastify } from "../Components/Toastify";
export { loginAPI, signupAPI, getAllUser };

async function signupAPI(payload) {
  console.log(payload, "::::::::::::::::::----");
  let url = `http://localhost:3004/v1/user/register`;
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  var results = await result.json();
  if (results.response.status === 200) {
    Toastify("success", results.response.message);
  } else {
    Toastify("error", results.response.message.field);
  }
  console.log(`RESULT::`, results);
  return results;
}

async function loginAPI(payload) {
  console.log(payload, "L:::::::::::::::::::::::::");
  let url = `http://localhost:3004/v1/user/login`;
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  var results = await result.json();
  if (results.response.status === 200) {
    Toastify("success", results.response.message);
  } else {
    Toastify("error", results.response.message.field);
  }
  console.log(`RESULT::`, results);
  return results;
}

async function getAllUser(payload) {
  let url = `http://10.1.4.216:3004/v1/user/getAllUser/,/,`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-TYpe": "application/json",
    },
  });
  var results = await result.json();
  if (results.response.status === 200) {
    Toastify("success", results.response.message);
  } else {
    Toastify("error", results.response.message.field);
  }
  console.log(`RESULT::`, results);
  return results;
}
