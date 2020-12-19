<template>
  <div>
    <y-literature v-for="(personalLiterature, i) in myLiteratures"
                  :id="personalLiterature.literatureID"
                  :title="personalLiterature.title"
                  :authors="personalLiterature.authors"
                  :tags="personalLiterature.tags"
                  :read_time="personalLiterature.read_time"></y-literature>
  </div>
</template>

<script>
import YLiterature from "@/components/common/y-literature/y-literature";

export default {
  name: "MyLiteratures",
  props: { userID : String },
  components: { YLiterature },
  data () {
    return {
      // user收藏文献集合
      myLiteratures: [
        {
          literatureID: "0",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: "0",
              authorID: "0",
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: "1",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: "0",
              authorID: "0",
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: "2",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: "0",
              authorID: "0",
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
    // 获取author的文献列表

  }
}
</script>

<style scoped>

</style>
