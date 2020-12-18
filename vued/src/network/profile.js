import { request } from "@/network/request";

// 个人信息系统
let baseURL = "http://185.133.193.251:8082";

// 获取用户收藏列表
export function getUserFavorLiteratures(userID) {
  return request(baseURL, { url: "/getUserFavorLiterature", params: { userID }, method: "get"});
}

// 获取用户关注用户列表
export function getUserFollowingList(userID) {
  return request(baseURL, { url: "/getUserFollowingList", params: { userID }, method: "get"})
}

// 获取关注自己的用户列表
export function getUserFollowersList(userID) {
  return request(baseURL, { url: "/getUserFollowersList", params: { userID }, method: "get"})
}

// 修改用户信息
export function editProfile(userID, username, realName, userDegree, image, organization, emailAddress, phoneNumber) {
  return request(
    baseURL,
    {
      url: "/editProfile",
      params: {
        userID: userID,
        username: username,
        realName: realName,
        userDegree: userDegree,
        image: image,
        organization: organization,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber
      },
      method: "post"
    })
}

// 关注/取消关注门户
export function follow(followerID, userID, option) {
  return request(
    baseURL,
    {
      url: "/follow",
      params: {
        followerID: followerID,
        userID: userID,
        option: option
      },
      method: "post"
    }
  )
}

// 获取用户门户信息
export function getIntroInformation(authorID) {
  return request(baseURL, { url: "/getIntroInformation", params: { authorID }, method: "get"})
}

// 获取用户对象
export function getUserInformation(userID) {
  return request(baseURL, { url: "/getUserInformation", params: { userID }, method: "get"})
}

// 获取当前用户是否关注该门户
export function getIntroFollowStatue(userID, authorID) {
  return request(
    baseURL,
    {
      url: "/getIntroFollowStatue",
      params: {
        userID: userID,
        authorID: authorID
      },
      method: "get"
    }
  )
}
