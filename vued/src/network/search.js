import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8081";

// 高级检索
export function advance(detail, start, end) {
  return request(baseURL, {
    url: "/advance",
    data: detail,
    params: {
      start,
      end
    },
    method: "post"
  });
}

// 普通检索
export function search(detail) {
  return request(baseURL, {
    url: "/search",
    data: detail,
    method: "post"
  });
}
