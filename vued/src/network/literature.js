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

//获取文献数据
export function getStats(literatureID) {
  return request(baseURL, {
    url: "/getStats",
    params: {
      literatureID
    },
    method: "post"
  });
}

//收藏文献
export function collect(userID,literatureID) {
  return request(baseURL, {
    url: "/collect",
    params: {
      userID,
      literatureID
    },
    method: "post"
  });
}