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
  props: { userID : '' },
  components: {YLiterature},
  data () {
    return {
      // user收藏文献集合
      favorLiteratures: [
        {
          literatureID: 0,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: 1,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: 2,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
      ],
    }
  },
  created() {
    getUserFavorLiteratures(this.userID)
      .then(console.log("get favors"), favor => { this.favorLiteratures = favor })
      .cache(error => { this.$notify.error("获取收藏文献出现时错误") })
  }
}
</script>

<style scoped>

</style>
