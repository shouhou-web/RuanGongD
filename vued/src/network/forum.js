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
    method: "post"
  });
}
