import { request } from "@/network/request";

// 获取用户收藏列表
export function getUserFavorLiteratures(userID) {
  return request({
    url: "/getUserFavorLiterature",
    params: {
      userID
    },
    method: "get"
  });
}

// 获取用户门户信息
export function getUserIntro(userID) {
  return request({
    url: "/getUserIntro",
    params: {
      userID
    },
    method: "get"
  })
}

// 获取用户关注用户列表
export function getUserFollowingList(userID) {
  return request({
    url: "/getUserFollowingList",
    params: {
      userID
    },
    method: "get"
  })
}

// 获取关注自己的用户列表
export function getUserFollowersList(userID) {
  return request({
    url: "/getUserFollowersList",
    params: {
      userID
    },
    method: "get"
  })
}
