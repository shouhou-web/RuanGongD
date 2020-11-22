import { request } from "@/network/request";

//社交系统
let baseURL = "http://39.99.154.244:8083";

/*
  字段类型默认为String
*/

/**
 * 获取所有分区信息
 * @returns {sectors[{sectorId,sectorName,postNum,userId,userAvatar,userName,postId,postName,editTime}]}
 * 分区id,分区名称,分区内动态总数,最后编辑的用户id,最后编辑的用户头像,最后编辑的用户名称,最后编辑的动态id,最后编辑的动态标题,最后编辑的时间
 * 最后编辑时间格式: 今年(MM月dd日 HH:mm) ,往年(yyyy年MM月dd日)
 */
export function getAllSectors() {
  return request(baseURL, {
    url: "/getAllSectors",
    params: {},
    method: "post"
  });
}

/**
 * 获取指定分区指定排序方式的指定数量的动态信息
 * @param {sectorId, start, num, sort}
 * 分区id, 从第start条起的num条(如0,25是从第0条到第24条), 排序方式
 * 排序方式: 0 最近更新时间从最晚到最早 ,1 创建时间从最晚到最早 ,2 标题字典序从小到大,3 回复数从多到少
 * @returns {posts[{postId,postName,replyNum,viewNum,createorId,creatorName,createTime,editorId,editorName,editorAvatar,editTime,tags[]}]}
 * 动态id,动态名称,动态的回复次数,动态的查看次数,动态的创建时间,创建者id,创建者名称,创建时间,最后编辑者id,最后编辑者名称，最后编辑者头像，最后编辑时间，动态的所有标签
 * 时间格式: 今年(MM月dd日 HH:mm) ,往年(yyyy年MM月dd日)
 */
export function getPosts(sectorId, start, num, sort) {
  return request(baseURL, {
    url: "/getPosts",
    params: { sectorId, start, num, sort },
    method: "post"
  });
}
