<template>
  <div id="reference" class="info-bottom">
    <div class="liter">
      <ul>
        <li v-for="(item, index) in referList">
          <l-followlicard class="litercard" :refer="item"></l-followlicard>
        </li>
      </ul>
    </div>

    <l-authorcard :authorID="authorID"></l-authorcard>
  </div>
</template>

<script>
import LFollowlicard from "./childCpn/followlicard.vue";
import LAuthorcard from "./childCpn/authorcard.vue";
import { getRelation, getRelatedAuthor } from "network/literature";

export default {
  name: "Reference",
  props: {
    venue: "",
  },
  data() {
    return {
      referList: [
        {
          literatureID: "123",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authorList: [
            //作者列表
            {
              authorID: "123",
              realName: "lw",
              image:
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1006923623,3624272264&fm=26&gp=0.jpg", //头像
            },
            {
              authorID: "123",
              realName: "lw",
              image:
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1006923623,3624272264&fm=26&gp=0.jpg", //头像
            },
          ],
          abstract:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved", //摘要
          keyWord: [
            {
              str: "aaa",
            },
            {
              str: "bbb",
            },
          ],
          year: "2020", //文献年份
          readTimes: 10, //阅读次数
        }, //文献

        {
          literatureID: "123",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authorList: [
            //作者列表
            {
              authorID: "123",
              realName: "lw",
              image: "test", //头像
            },
            {
              authorID: "123",
              realName: "lw",
              image: "test", //头像
            },
          ],
          abstract:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved", //摘要
          keyWord: [
            {
              str: "aaa",
            },
            {
              str: "bbb",
            },
          ],
          year: "2020", //文献年份
          readTimes: 10, //阅读次数
        }, //文献
        {
          literatureID: "123",
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authorList: [
            //作者列表
            {
              authorID: "123",
              realName: "lw",
              image: "test", //头像
            },
            {
              authorID: "123",
              realName: "lw",
              image: "test", //头像
            },
          ],
          abstract:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved", //摘要
          keyWord: [
            {
              str: "aaa",
            },
            {
              str: "bbb",
            },
          ],
          year: "2020", //文献年份
          readTimes: 10, //阅读次数
        }, //文献
      ],
      authorID:"",
    };
  },
  created() {
    console.log(this.venue);
    getRelation(this.venue).then((res) => {
      this.referList = res;
    });
    getRelatedAuthor(this.venue).then((res) => {
      this.authorID = res;
    });
  },
  methods: {},
  components: {
    LFollowlicard,
    LAuthorcard,
  },
};
</script>

<style scoped>
.info-bottom {
  width: 1100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-bottom .litercard {
  width: 700px;
}
</style>
