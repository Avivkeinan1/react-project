import HttpService from "./httpService";

import { setHeaders } from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

setTokenHeader();

export function createUser(user) {
  return HttpService.post("/users", user);
}

// createUser({
//   email: "asdasd@sdasdasdasd.com",
//   name: "asdas1212d",
//   password: "asdasd3213123asfasf",
//   biz: false,
// }).then(console.log());

export async function loginUser(credentials) {
  const { data } = await HttpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);

  setTokenHeader();
  console.log(data);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch {
    return null;
  }
}
export function Logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function setTokenHeader() {
  setHeaders("x-auth-token", getJwt());
}

const userService = {
  createUser,
  loginUser,
  Logout,
  getJwt,
  getUser,
};

export default userService;
