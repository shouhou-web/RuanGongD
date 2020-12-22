import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8081";

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
export function createLiterature(userID, createLiForm) {
  //console.log(createLiForm);
  return request(baseURL, {
    url: "/addLiterature",
    params: {
      userID,
      createLiForm
    },
    method: "post"
  });
}

// 通过作者名获取作者列表
export function getAuthors(authorName) {
  //console.log(createLiForm);
  return request(baseURL, {
    url: "/getAuthors",
    params: {
      authorName
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
export function getRelation(venue) {
  return request(baseURL, {
    url: "/getRelation",
    params: {
      venue
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
export function collect(userID, literatureID,year,venue, title, option) {
  return request(baseURL, {
    url: "/collect",
    params: {
      userID,
      literatureID,
      year,
      venue,
      title,
      option
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
export function reportLiterature(userID, literatureID, title, content) {
  return request(baseURL, {
    url: "/reportLiterature",
    params: {
      userID,
      literatureID,
      title,
      content
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


//获取收藏状态
export function getcollect(userID, literatureID) {
  return request(baseURL, {
    url: "/getcollect",
    params: {
      userID,
      literatureID,
    },
    method: "post"
  });
}