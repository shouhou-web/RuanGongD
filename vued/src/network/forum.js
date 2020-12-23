import { request } from "@/network/request";

//社交系统
let baseURL = "http://60.205.189.66:8083";

/*
  字段类型默认为String
*/

/**
 * 获取所有分区信息
 * @returns {sectors[{sectorId,sectorName,postNum,userId,userAvatar,userName,postId,postName,editTime}]}
 *  sectors[]是数组,里面的元素是对象:
 *    sectorId: 分区id
 *    sectorName: 分区名称
 *    postNum: 分区内动态总数
 *    userId: 最后编辑的用户id
 *    userAvatar: 最后编辑的用户头像
 *    userName: 最后编辑的用户名称
 *    postId: 最后编辑的动态id
 *    postName: 最后编辑的动态标题
 *    editTime: 最后编辑的时间
 *  时间格式: 今年(MM月dd日 HH:mm) ,往年(yyyy年MM月dd日)
 */
export function getAllSectors() {
  return request(baseURL, {
    url: "/getAllSectors",
    data: {},
    method: "post"
  });
}

/**
 * 获取所有分区,以及每个分区下的默认标签
 * @returns {sectorList[{sectorId, sectorName, sectorTags[]}]}
 *  sectorId: 分区 id
 *  sectorName: 分区名
 *  sectorTags[]: 分区下所有默认标签
 */
export function getAllTags() {
  return request(baseURL, {
    url: "/getAllTags",
    data: {},
    method: "post"
  });
}

/**
 * 发表动态
 * @param {createPostForm{userId, postName, postContent, sectorId, postTags[], citeId}}
 *  createPostForm是一个对象
 *    userId: 发动态的用户 id
 *    postName: 动态标题
 *    postContent: 动态内容
 *    sectorId: 分区 id
 *    postTags[]: 动态的标签数组,可为空数组
 *    citeId: 引用的文献 id
 *      citeId == -1 表示未引用文献
 * @returns {postId, result}
 *  动态ID,是否成功("true" or "false")
 */
export function createPost(createPostForm) {
  return request(baseURL, {
    url: "/createPost",
    data: {
      createPostForm: createPostForm
    },
    method: "post"
  });
}

/**
 * 获取单条动态信息
 * @param {userId}
 *  userId: 用户id
 *  postId: 要获取的动态id
 * @returns {postName, postContent, replyNum, viewNum, creatorId, creatorAvatar, creatorName, createTime, tags[], citeId, comments[{commentId, commenterId, commenterName, commenterAvatar, floor, commentContent, commentTime}]}
 *  postName: 动态标题
 *  postContent: 动态内容
 *  replyNum: 动态的评论数
 *  viewNum: 动态的被查看次数
 *  creatorId: 创建者id
 *  creatorAvatar: 创建者头像链接
 *  creatorName: 创建者名称
 *  createTime: 创建时间
 *  tags[]: 标签数组，里面元素是string
 *  citeId: 引用的文献id，没有则设为 -1
 *  comments[]: 评论数组，里面元素是对象
 *    commentId: 评论id
 *    commenterId: 评论者id
 *    commenterName: 评论者名称
 *    commenterAvatar: 评论者头像链接
 *    floor: 楼层，从 2 开始
 *    commentContent: 评论内容
 *    commentTime: 评论时间
 */
export function getPostInfo(userId, postId) {
  return request(baseURL, {
    url: "/getPostInfo",
    data: { userId, postId },
    method: "post"
  });
}

/**
 * 获取指定分区指定排序方式的指定数量的动态信息
 * @param {sectorId, start, num, sort, keyword}
 *  sectorId:分区id
 *  start, num: 从第start条起的num条(如0,25是从第0条到第24条)
 *  sort: 排序方式: 0 最近更新时间从最晚到最早 ,1 创建时间从最晚到最早 ,2 标题字典序从小到大,3 回复数从多到少
 *  keyword: 搜索关键词: ""空字符串返回所有动态, 非空字符串则从标签和标题模糊搜索动态
 * @returns {posts[{postId,postName,replyNum,viewNum,creatorId,creatorName,createTime,editorId,editorName,editorAvatar,editTime,tags[]}]}
 *  posts[]是数组,里面的元素是对象:
 *    postId: 动态id
 *    postName: 动态名称(标题)
 *    replyNum: 动态的评论数
 *    viewNum: 动态的被查看次数
 *    creatorId: 创建者id
 *    creatorName: 创建者名称
 *    createTime: 动态的创建时间
 *    editorId: 最后编辑者id
 *    editorName: 最后编辑者名称
 *    editorAvatar: 最后编辑者头像
 *    editTime: 最后编辑时间
 *    tags[]: 数组, 动态的所有标签,
 *  时间格式: 今年(MM月dd日 HH:mm) ,往年(yyyy年MM月dd日)
 */
export function getPosts(sectorId, start, num, sort, keyword) {
  return request(baseURL, {
    url: "/getPosts",
    data: { sectorId, start, num, sort, keyword },
    method: "post"
  });
}

/**
 * 用户是否已经关注分区
 * @param {userId, sectorId}
 *  userId: 用户id
 *  sectorId: 分区id
 * @return {followed}
 *  followed: 用户关注了该分区返回 "1", 否则返回 "0"
 */
export function isFollowed(userId, sectorId) {
  return request(baseURL, {
    url: "/isFollowed",
    data: { userId, sectorId },
    method: "post"
  });
}

/**
 * 关注分区
 * 如果关注了分区就取消关注, 没关注分区就关注
 * @param {userId, sectorId}
 *  userId: 用户id
 *  sectorId: 分区id
 * @return {followed}
 *  result: 成功返回 "true", 否则返回 "false"
 */
export function followSector(userId, sectorId) {
  return request(baseURL, {
    url: "/followSector",
    data: { userId, sectorId },
    method: "post"
  });
}

/**
 * 举报动态
 * @param {userId, postId, reportContent}
 *  userId: 用户id
 *  postId: 动态id
 *  reportContent: 举报理由
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function reportPost(userId, postId, reportContent) {
  return request(baseURL, {
    url: "/reportPost",
    data: { userId, postId, reportContent },
    method: "post"
  });
}

/**
 * 删除动态
 * @param {userId, postId}
 *  userId: 用户id
 *  postId: 动态id
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function deletePost(userId, postId) {
  return request(baseURL, {
    url: "/deletePost",
    data: { userId, postId },
    method: "post"
  });
}

/**
 * 评论动态
 * @param {userId, postId, commentContent}
 *  userId: 用户id
 *  postId: 动态id
 *  commentContent: 评论内容
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function commentPost(userId, postId, commentContent) {
  return request(baseURL, {
    url: "/commentPost",
    data: { userId, postId, commentContent },
    method: "post"
  });
}

/**
 * 举报评论
 * @param {userId, reportCommentId, reportContent}
 *  userId: 用户id
 *  reportCommentId: 举报评论id
 *  reportContent: 举报理由
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function reportComment(userId, reportCommentId, reportContent) {
  return request(baseURL, {
    url: "/reportComment",
    data: { userId, reportCommentId, reportContent },
    method: "post"
  });
}

/**
 * 删除评论
 * @param {userId, deleteCommentId}
 *  userId: 用户id
 *  deleteCommentId: 删除评论id
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function deleteComment(userId, deleteCommentId) {
  return request(baseURL, {
    url: "/deleteComment",
    data: { userId, deleteCommentId },
    method: "post"
  });
}

/**
 * 发送咨询消息
 * @param {senderId, receiverId, text}
 *  senderId: 发送者Id
 *  receiverId: 接受者Id
 *  text: 消息内容
 * @return {result}
 *  result: 成功返回 "true", 失败返回 "false"
 */
export function createConsultation(senderId, receiverId, text) {
  return request(baseURL, {
    url: "/createConsultation",
    data: { senderId, receiverId, text },
    method: "post"
  });
}

/**
 * 分区动态总数
 * @param {sectorId}
 *  sectorId: 讨论区分区Id
 * @return {total}
 *  total: 该分区下动态总数
 */
export function getPostNum(sectorId) {
  return request(baseURL, {
    url: "/getPostNum",
    data: { sectorId },
    method: "post"
  });
}

/**
 * 获取一个用户的全部动态
 * @param {userId}
 *  userId: 用户Id
 * @return {posts[{postId, postName, replyNum, viewNum, sectorName, createTime, tags[]}]}
 *  posts[]是数组,里面的元素是对象:
 *    postId: 动态id
 *    postName: 动态名称(标题)
 *    replyNum: 动态的评论数
 *    viewNum: 动态的被查看次数
 *    sectorName: 动态所在分区名称
 *    createTime: 动态的创建时间
 *    tags[]: 数组, 动态的所有标签,
 */
export function getUserPosts(userId) {
  return request(baseURL, {
    url: "/getUserPosts",
    data: { userId },
    method: "post"
  });
}

/**
 * 获取用户关注的人的动态
 * @param {userId}
 *  userId: 用户id
 * @returns {posts[{postId,postName,replyNum,viewNum,creatorId,creatorName,createTime,editorId,editorName,editorAvatar,editTime,tags[]}]}
 *  posts[]是数组,里面的元素是对象:
 *    postId: 动态id
 *    postName: 动态名称(标题)
 *    replyNum: 动态的评论数
 *    viewNum: 动态的被查看次数
 *    creatorId: 创建者id
 *    creatorAvatar: 创建者头像
 *    creatorName: 创建者名称
 *    createTime: 动态的创建时间
 *    tags[]: 数组, 动态的所有标签,
 *  时间格式: yyyy-MM-dd
 */
export function getFollowedPosts(userId) {
  return request(baseURL, {
    url: "/getFollowedPosts",
    data: { userId },
    method: "post"
  });
}

/**
 * 获取用户对所有分区的关注情况
 * @returns {sectors[{sectorId, followed}]}
 *  sectorId: 分区 id
 *  followed: 用户关注了该分区返回 "1", 否则返回 "0"
 */
export function isFollowedAll(userId) {
  return request(baseURL, {
    url: "/isFollowedAll",
    data: {userId},
    method: "post"
  });
}

/**
 * 用户是否是认证用户，以及返回authorID
 * @returns {userIdentity, authorID}
 *  都是字符串
 *  没有 authorID 也返回个空的
 */
export function getUserIdentity(userId) {
  return request(baseURL, {
    url: "/getUserIdentity",
    data: {userId},
    method: "post"
  })
}
