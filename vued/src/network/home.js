import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8081";

// 获取高被引论文
export function getHighCiation() {
  return request(baseURL, {
    url: "/getHighCiation",
    params: {},
    method: "post"
  });
}

// 获取高收藏论文
export function getHighCollect() {
  return request(baseURL, {
    url: "/getHighCollect",
    params: {},
    method: "post"
  });
}
