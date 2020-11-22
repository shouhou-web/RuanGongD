import { request } from "@/network/request";
import qs from "qs";
let baseURL = "http://39.99.154.244:8080";
// 高级检索
export function advance(detail, start, end) {
  return request(baseURL, {
    url: "/advance",
    params: {
      detail: qs.stringify(detail, { indices: false }),
      start,
      end
    },
    method: "post"
  });
}
