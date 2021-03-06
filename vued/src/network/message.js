import { request } from "@/network/request";
let baseURL = "http://60.205.189.66:8084";

// 获取评论信息
export function getCommentMsg(userID) {
  return request(baseURL, {
    url: "/getCommentMsg",
    params: {
      userID
    },
    method: "post"
  });
}

// 获取系统消息
export function getSystemMsg(userID) {
  return request(baseURL, {
    url: "/getSystemMsg",
    params: {
      userID
    },
    method: "post"
  });
}

// 查看咨询消息
export function getConsultMsg(userID) {
  return request(baseURL, {
    url: "/getConsultMsg",
    params: {
      userID
    },
    method: "post"
  });
}

// 删除消息
export function deleteMsg(messageID) {
  return request(baseURL, {
    url: "/deleteMsg",
    params: {
      messageID
    },
    method: "post"
  });
}

// 回复消息
export function replyMsg(messageID, content) {
  return request(baseURL, {
    url: "/replyMsg",
    params: {
      messageID,
      content
    },
    method: "post"
  });
}
