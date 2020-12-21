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
  return request(baseURL, {
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
export function collect(userID, literatureID) {
  return request(baseURL, {
    url: "/collect",
    params: {
      userID,
      literatureID
    },
    method: "post"
  });
}

//根据authorid找user+author的信息
export function getAuthorInformation(authorID) {
  return request(baseURL, {
    url: "/getAuthorInformation",
    params: {
      authorID
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

//举报文献
export function reportLiterature(userID, literatureID, title, Content) {
  return request(baseURL, {
    url: "/reportLiterature",
    params: {
      userID,
      literatureID,
      title,
      Content
    },
    method: "post"
  });
}

//获取文献的评论列表
export function getComment(literatureID) {
  return request(baseURL, {
    url: "/getComment",
    params: {
      literatureID
    },
    method: "post"
  });
}

//评论文献
export function comment(userID, literatureID, content) {
  return request(baseURL, {
    url: "/comment",
    params: {
      userID,
      literatureID,
      content
    },
    method: "post"
  });
}
