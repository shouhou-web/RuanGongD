import { request } from "@/network/request";
let baseURL = "http://185.133.193.251:8081";

// 获取个人文献列表
export function getMyLiterature(userID) {
  return request(baseURL, {
    url: "/getMyLiterature",
    params: {
      userID
    },
    method: "post"
  });
}

// 修改文献链接
// 获取个人文献列表
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