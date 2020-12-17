<template>
  <div id="reference" class="info-bottom">
    <div class="liter">
      <ul>
        <li v-for="(item, index) in referList">
          <l-followlicard class="litercard" :refer="item"></l-followlicard>
        </li>
      </ul>
    </div>

    <l-authorcard :author="auther"></l-authorcard>
  </div>
</template>

<script>
import LFollowlicard from "./childCpn/followlicard.vue";
import LAuthorcard from "./childCpn/authorcard.vue";

export default {
  name: "Reference",
  data() {
    return {
      referList: [
        {
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: ["Saber", "Lancer"],
          tags: ["tag 1", "tag 2"],
          time: "2020-11-26",
          img: ["../img/test.jpg", "../img/test.jpg", "../img/test.jpg"],
          brief:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved​",
          read_time: 10,
        },
        {
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: ["Saber", "Lancer"],
          tags: ["tag 1", "tag 2"],
          time: "2020-11-26",
          img: ["../img/test.jpg", "../img/test.jpg", "../img/test.jpg"],
          brief:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved​",
          read_time: 10,
        },
      ],
      auther: {
        autherID:"",
        realName: "阿尔托莉雅",
        work: "saber",
        organization: "不列颠",
        image: "test",
        introduction:
          "身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世.身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世",
      },
    };
  },
  methods: {},
  components: {
      LFollowlicard,
      LAuthorcard
  },
};
</script>

<style scoped>
.info-bottom {
  width: 1100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.info-bottom .litercard {
  width: 700px;
}
</style>
