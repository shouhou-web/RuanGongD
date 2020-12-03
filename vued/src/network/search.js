import { request } from "@/network/request";
let baseURL = "http://185.133.193.251:8081";
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
