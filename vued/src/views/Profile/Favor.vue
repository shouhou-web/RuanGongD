<template>
  <div class="favor">
    <y-literature v-for="(onefollowingLiterature, i) in favorLiteratures"
                  :id="onefollowingLiterature.literatureID"
                  :title="onefollowingLiterature.title"
                  :authors="onefollowingLiterature.authors"
                  :tags="onefollowingLiterature.tags"
                  :read_time="onefollowingLiterature.read_time"></y-literature>
    <div v-if="favorLiteratures.length == 0" class="none">
      <img src="../../assets/image/no-img.png" class="none-img">
    </div>
  </div>
</template>

<script>
import YLiterature from "@/components/common/y-literature/y-literature";
import { getFavorLiteratures } from "@/network/profile"

export default {
  name: "Favor",
  props: { userID : String },
  components: { YLiterature },
  data () {
    return {
      // user收藏文献集合
      favorLiteratures: [],
    }
  },
  created() {
    getFavorLiteratures(this.userID)
    .then((favor) => {
      this.favorLiteratures = favor
      console.log("favor", favor)
    })
    .catch((err) => { this.$notify.error({ title: "网络错误", message: "请稍后重试~" }) })
  }
}
</script>

<style scoped>
.favor {
  width: 101%;
  max-height: 601px;
  overflow: scroll;
}

.favor::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.favor::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 2px;
  background-color: #4F6EF2;
}
.favor::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(255, 255, 255, 0.2);
  background   : none;
  border-radius: 10px;
}


.none {
  height: 600px;
  border: 1px solid #dddddd;
  background-color: white;
}

.none-img {
  width: 30%;
  margin-left: 34%;
  margin-top: 180px;
}
</style>
