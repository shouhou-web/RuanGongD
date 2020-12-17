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

//获取相关文献
export function getRelation(area) {
  return request(baseURL, {
    url: "/getRelation",
    params: {
      area
    },
    method: "post"
  });
}


//获取相关作者
export function getRelatedAuthor(venue) {
  return request(baseURL, {
    url: "/getRelatedAuthor",
    params: {
      venue
    },
    method: "post"
  });
}