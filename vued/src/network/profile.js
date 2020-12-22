import { request } from "@/network/request";

// 个人信息系统
let baseURL = "http://60.205.189.66:8082";

// 获取用户收藏列表
export function getFavorLiteratures(userID) {
  return request(baseURL, { url: "/getFavorLiteratures", params: { userID }, method: "get"});
}

// 获取用户关注用户列表
export function getUserFollowingList(userID) {
  return request(baseURL, { url: "/getUserFollowingList", params: { userID }, method: "get"})
}

// 获取关注自己的用户列表
export function getUserFollowersList(userID) {
  return request(baseURL, { url: "/getUserFollowersList", params: { userID }, method: "get"})
}

// 修改用户基本信息
export function editProfile(userID, realName, userDegree, image, organization, phoneNumber) {
  return request(
    baseURL,
    {
      url: "/editProfile",
      params: {
        userID: userID,
        realName: realName,
        userDegree: userDegree,
        image: image,
        organization: organization,
        phoneNumber: phoneNumber
      },
      method: "post"
    })
}

// 修改用户名称
export function editUserName(userID, username) {
  return request(
    baseURL,
    {
      url: "editUserName",
      params: {
        userID: userID,
        username: username
      },
      method: "post"
    }
  )
}

// 修改用户邮箱
export function editUserEmailAddress(userID, emailAddress) {
  return request(
    baseURL,
    {
      url: "editUserEmailAddress",
      params: {
        userID: userID,
        emailAddress: emailAddress
      },
      method: "post"
    }
  )
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

// 申请门户、认证
export function apply(userID, authorID, realName, emailAddress, content) {
  return request(
    baseURL,
    {
      url: "apply",
      params: {
        userID: userID,
        authorID: authorID,
        realName: realName,
        emailAddress: emailAddress,
        content: content
      },
      method: "post"
    }
  )
}

// 申请认证时的邮箱认证
export function emailVerification(emailAddress) {
  return request(
    baseURL,
    {
      url: "emailVerification",
      params: {
        emailAddress: emailAddress
      },
      method: "get"
    }
  )
}

// 举报门户
export function reportGate(userID, content, authorID) {
  return request(
    baseURL,
    {
      url: "reportGate",
      params: {
        userID: userID,
        content: content,
        authorID: authorID
      },
      method: "post"
    }
  )
}

// 获取用户对象
export function getUserInformation(userID) {
  return request(baseURL, { url: "/getUserInformation", params: { userID }, method: "get"})
}

// 获取当前用户是否关注该门户
export function getIntroFollowStatus(userID, authorID) {
  return request(
    baseURL,
    {
      url: "/getIntroFollowStatus",
      params: {
        userID: userID,
        authorID: authorID
      },
      method: "get"
    }
  )
}

// 获取门户近一年的发布文献数量
export function getPublishState(authorID) {
  return request(
    "60.205.189.66:8081",
    {
      url: "/getPublishState",
      params: {
        authorID: authorID
      },
      method: "get"
    }
  )
}

// 获取作者相关信息
export function getAuthorInformation(authorID) {
  return request(
    "60.205.189.66:8081",
    {
      url: "/getAuthorInformation",
      params: {
        authorID: authorID
      },
      method: "get"
    }
  )
}

// 上传图片
export function editUserImage(userID, imageUrl) {
  return request(
    baseURL,
    {
      url: "/editUserImage",
      params: {
        userID: userID,
        imageUrl: imageUrl
      },
      method: "post"
    }
  )
}
