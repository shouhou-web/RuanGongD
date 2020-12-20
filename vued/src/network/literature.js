import { request } from "@/network/request";
let baseURL = "http://185.133.193.251:8081";

// 修改文献链接
export function editLiterature(userID, Lid, url) {
  return request(baseURL, {
    url: "/editLiterature",
    params: {
      userID,
      Lid,
      url
    },
    method: "post"
  });
}

//发布文献
export function createLiterature(createLiForm) {
  //console.log(createLiForm);
  return request(baseURL, {
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

// 获取个人文献
export function getMyLiterature(authorID) {
  return request(baseURL, {
    url: "/getMyLiterature",
    params: {
      authorID
    },
    method: "post"
  });
}
