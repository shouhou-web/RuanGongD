import { request } from "@/network/request";

//社交系统
let baseURL = "http://39.99.154.244:8083";

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
    params: {},
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
    params: {},
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
// TODO: 是否可以发表图片待定
export function createPost(createPostForm) {
  return request(baseURL, {
    url: "/createPost",
    params: {
      createPostForm
    },
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
    params: { sectorId, start, num, sort, keyword },
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
    params: { userId, sectorId },
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
    url: "/fFollowSector",
    params: { userId, sectorId },
    method: "post"
  });
}
