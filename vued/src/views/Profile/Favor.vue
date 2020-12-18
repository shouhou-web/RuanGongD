<template>
  <div>
    <y-literature v-for="(onefollowingLiterature, i) in favorLiteratures"
                  :id="onefollowingLiterature.literatureID"
                  :title="onefollowingLiterature.title"
                  :authors="onefollowingLiterature.authors"
                  :tags="onefollowingLiterature.tags"
                  :read_time="onefollowingLiterature.read_time"></y-literature>
  </div>
</template>

<script>
import YLiterature from "@/components/common/y-literature/y-literature";
import { getUserFavorLiteratures } from "@/network/profile"

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
    getUserFavorLiteratures(this.userID)
    .then((favor) => { this.favorLiteratures = favor })
    .catch((err) => { this.$notify.error({ title: "网络错误", message: "请稍后重试~" }) })
  }
}
</script>

<style scoped>

</style>
