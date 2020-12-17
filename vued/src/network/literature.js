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
