import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8082";

// 登录
export function login(ID, password) {
  return request(baseURL, {
    url: "/login",
    params: {
      ID,
      password
    },
    method: "post"
  });
}

//注册
export function register(username, password, password2) {
    return request(baseURL, {
      url: "/register",
      params: {
        username,
        password,
        password2
      },
      method: "post"
    });
}
