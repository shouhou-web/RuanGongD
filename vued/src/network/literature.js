import { request } from "@/network/request";

export function createLiterature(createLiForm) {
  //console.log(createLiForm);
  return request({
    url: "/createLiterature",
    params: {
      createLiForm
    },
    method: "post"
  });
}
