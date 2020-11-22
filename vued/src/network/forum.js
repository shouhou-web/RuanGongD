import { request } from "@/network/request";

//社交系统
let baseURL = "http://39.99.154.244:8083";

/**
 * 获取所有分区信息
 * @returns {sectors[{sectorId,sectorName,postNum,userId,userAvatar,userName,postId,postName,editTime}]}
 *  分区id,分区名称,分区内动态总数,最后编辑的用户id,最后编辑的用户头像,最后编辑的用户名称,最后编辑的动态id,最后编辑的动态标题,最后编辑的时间(格式"MM月dd日 HH:mm")
 */
export function getAllSectors() {
  return request(baseURL, {
    url: "/getAllSectors",
    params: {},
    method: "post",
  });
}

/**
 * 获取所有分区，以及每个分区下的默认标签
 * @returns {tags}  // TODO 还没想好怎么约定一次性返回所有分区和标签的映射数据格式
 *  全部标签
 */
export function getAllTags() {
  return request(baseURL, {
    url: "/getAllTags",
    params: {},
    method: "post",
  });
}

/**
 * 发表动态
 * citeId == -1 是表示未引用
 * @returns {postId, result}
 *  动态ID，是否成功("true" or "false")
 */
// TODO: 是否可以发表图片待定
export function createPost(userId, postContent, postSectorId, postTags, citeId) {
  return request(baseURL, {
    url: "/createPost",
    params: {
      userId,
      postContent,
      postSectorId,
      postTags,
      citeId,
    },
    method: "post",
  });
}
