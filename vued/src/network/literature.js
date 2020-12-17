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

//获取文献详情
export function getLiterature(literatureID) {
  return request({
    url: "/getLiterature",
    params: {
      literatureID
    },
    method: "post"
  });
}
