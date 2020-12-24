import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8084";

// 通过举报
export function approveReport(reportID) {
  return request(baseURL, {
    url: "approveReport",
    params: {
      reportID
    },
    method: "post"
  });
}

// 驳回举报
export function rejectReport(reportID, msgContent) {
  return request(baseURL, {
    url: "rejectReport",
    params: {
      reportID,
      msgContent
    },
    method: "post"
  });
}

// 删除举报
export function deleteReport(reportID) {
  return request(baseURL, {
    url: "/deleteReport",
    params: {
      reportID
    },
    method: "post"
  });
}

// 获取所有文献的举报信息
export function getArticleReports() {
  return request(baseURL, {
    url: "/getArticleReports",
    params: {},
    method: "post"
  });
}

// 获取所有门户的举报信息
export function getGateReports() {
  return request(baseURL, {
    url: "/getGateReports",
    params: {},
    method: "post"
  });
}

// 获取所有评论的举报信息
export function getCommentReports() {
  return request(baseURL, {
    url: "/getCommentReports",
    params: {},
    method: "post"
  });
}

// 获取所有动态的举报信息
export function getPostReports() {
  return request(baseURL, {
    url: "/getPostReports",
    params: {},
    method: "post"
  });
}

// 获取所有的申请
export function getAllGateApplication() {
  return request(baseURL, {
    url: "getAllGateApplication",
    params: {},
    method: "post"
  });
}

//通过申请
export function approveApplication(applicationID) {
  return request(baseURL, {
    url: "approveApplication",
    params: {
      applicationID
    },
    method: "post"
  });
}

//驳回申请
export function rejectApplication(applicationID, msgContent) {
  return request(baseURL, {
    url: "rejectApplication",
    params: {
      applicationID,
      msgContent
    },
    method: "post"
  });
}

//发送系统消息
export function sendSysMsg(content) {
  return request(baseURL, {
    url: "/sendSysMsg",
    params: {
      content
    },
    method: "post"
  });
}
