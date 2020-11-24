import { request } from "@/network/request";
let baseURL = "http://39.99.154.244:8080";
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
