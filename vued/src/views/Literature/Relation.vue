<template>
  <div id="reference" class="info-bottom">
    <div class="liter">
      <ul>
        <li v-for="(item, index) in referList">
          <l-followlicard class="litercard" :refer="item"></l-followlicard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LFollowlicard from "./childCpn/followlicard.vue";
import LAuthorcard from "./childCpn/authorcard.vue";

export default {
  name: "Reference",
  props: {
    referList: [
      {
        title: "",
        authors: [],
        tags: [],
        time: "",
        img: [],
        brief:"",
        read_time: 0,
      },
    ],
    auther: {
      autherID: "",
      realname: "",
      organization: "",
      image: "",
      introduction:"",
    },
  },
  data() {
    return {};
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
}

.info-bottom .litercard {
  width: 700px;
}
</style>
