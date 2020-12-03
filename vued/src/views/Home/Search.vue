<template>
  <!-- 检索结果 -->
  <div id="search">
    <m-app-header></m-app-header>
    <!-- 检索框 -->
    <div class="search">
      <search-advance
        :initSearch="$route.query"
        :isShow="isShow"
        @change-advance="changeAdvance"
      />
      <div class="search__btn" @click="changeShow" v-if="isAdvance">
        <img v-if="isShow" src="@/assets/icons/home/fold-up.png" alt="" />
        <img
          v-else-if="!isShow"
          src="@/assets/icons/home/fold-down.png"
          alt=""
        />
      </div>
    </div>
    <!-- 检索结果 -->
    <div class="answer">
      <div class="answer__header">
        <div class="header__num">共找到{{ answer.num }}个结果</div>
        <div class="header__query">检索式：{{ answer.query }}</div>
        <div class="header__sort">
          <div class="">Sorted by</div>
          <m-dropdown :cur="SU" type="click-type" />
        </div>
      </div>
      <div class="answer__main">
        <div class="main__aside">
          <!-- <l-button>搜索</l-button> -->
          <search-dropdown type="Author" :typeList="authorList" />
          <search-dropdown type="Venue" :typeList="venueList" />
          <search-dropdown type="Affiliation" :typeList="affList" />
        </div>
        <div class="main__content">
          <div class="content__fstline">
            <div class="line__title">题名</div>
            <div class="line__author">作者</div>
            <div class="line__venue">来源</div>
            <div class="line__year">发表时间</div>
            <div class="line__ciation">被引</div>
            <div class="line__action">操作</div>
          </div>
          <ul>
            <li v-for="(item, index) in searchList" :key="index">
              <div class="content__secline--dark" v-if="index % 2 == 0">
                <div class="line__title">
                  {{ item.title }}
                </div>
                <div class="line__author">
                  {{ item.author }}
                </div>
                <div class="line__venue">
                  {{ item.venue }}
                </div>
                <div class="line__year">
                  {{ item.year }}
                </div>
                <div class="line__ciation">
                  {{ item.ciation }}
                </div>
                <div class="line__action">操作</div>
              </div>
              <div class="content__secline" v-else>
                <div class="line__title">
                  {{ item.title }}
                </div>
                <div class="line__author">
                  {{ item.author }}
                </div>
                <div class="line__venue">
                  {{ item.venue }}
                </div>
                <div class="line__year">
                  {{ item.year }}
                </div>
                <div class="line__ciation">
                  {{ item.ciation }}
                </div>
                <div class="line__action">操作</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchAdvance from "./childCpn/search-advance";
import searchDropdown from "./childCpn/search-dropdown";
export default {
  name: "Search",
  data() {
    return {
      isShow: false,
      isAdvance: false,
      answer: {
        num: "3,567",
        query: "1884-2021: ((covid) WN ALL)"
      },
      type: "Access type",
      authorList: [
        {
          key: "Open Access",
          value: 1769
        },
        {
          key: "Other",
          value: 1798
        }
      ],
      affList: [
        {
          key: "Open Access",
          value: 1769
        },
        {
          key: "Other",
          value: 1798
        }
      ],
      venueList: [
        {
          key: "Open Access",
          value: 1769
        },
        {
          key: "Other",
          value: 1798
        }
      ],
      searchList: [
        {
          title:
            "Considerations for head and neck oncology practices during the coronavirus disease 2019 ( COVID ‐19) pandemic: Wuhan and Toronto experience",
          author:
            "Baig Abdul Mannan Department of Biological and Biomedical Sciences, Aga Khan University, Pakistan.",
          venue: "Journal of medical virology",
          year: "2020-10-23",
          ciation: 1024
        },
        {
          title:
            "Considerations for head and neck oncology practices during the coronavirus disease 2019 ( COVID ‐19) pandemic: Wuhan and Toronto experience",
          author:
            "Baig Abdul Mannan Department of Biological and Biomedical Sciences, Aga Khan University, Pakistan.",
          venue: "Journal of medical virology",
          year: "2020-10-23",
          ciation: 1024
        },
        {
          title:
            "Considerations for head and neck oncology practices during the coronavirus disease 2019 ( COVID ‐19) pandemic: Wuhan and Toronto experience",
          author:
            "Baig Abdul Mannan Department of Biological and Biomedical Sciences, Aga Khan University, Pakistan.",
          venue: "Journal of medical virology",
          year: "2020-10-23",
          ciation: 1024
        },
        {
          title:
            "Considerations for head and neck oncology practices during the coronavirus disease 2019 ( COVID ‐19) pandemic: Wuhan and Toronto experience",
          author:
            "Baig Abdul Mannan Department of Biological and Biomedical Sciences, Aga Khan University, Pakistan.",
          venue: "Journal of medical virology",
          year: "2020-10-23",
          ciation: 1024
        }
      ]
    };
  },
  created() {
    console.log(this.$route.query);
    this.isAdvance = this.$route.query.searchList.length > 1 ? true : false;
  },
  methods: {
    changeShow() {
      this.isShow = !this.isShow;
    },
    changeAdvance(e) {
      this.isAdvance = e;
      if (!e) this.isShow = false;
      else this.isShow = true;
    }
  },
  components: {
    searchAdvance,
    searchDropdown
  }
};
</script>

<style scoped>
.answer {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #505050;
  margin: 20px auto;
  width: var(--width-main);
}

.answer__header {
  align-items: flex-end;
  background-color: #d5e9e3;
  display: flex;
  padding: 20px;
}

.header__num {
  float: left;
  padding-right: 10px;
  font-size: 2.25rem;
  width: auto;
  line-height: 2.25rem;
}

.header__query {
  font-size: 16px;
  flex: 1;
  line-height: 16px;
}

.header__sort {
  display: flex;
}

.answer__main {
  display: flex;
}

.main__aside {
  /* border: 1px solid #f2f2f2; */
  height: 100%;
  width: 296px;
}

.content__fstline,
.content__secline,
.content__secline--dark {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
}

.content__fstline *,
.content__secline *,
.content__secline--dark * {
  align-items: center;
  color: #778192;
  display: flex;
  font-size: 14px;
  justify-content: center;
  line-height: 21px;
  text-align: center;
}

.content__secline--dark {
  background-color: #f6f8fa;
}

.line__title {
  width: 352px;
}

.line__author {
  width: 113px;
}

.line__venue {
  width: 121px;
}

.line__year {
  width: 85px;
}

.line__ciation {
  width: 40px;
}

.line__action {
  width: 93px;
}

.search {
  border: 1px solid #e4e4e4;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 5px #cdcdcd;
  padding: 20px;
}

.search__btn {
  background-color: #eee;
  border-radius: 50%;
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin: 10px auto -35px;
  padding: 8px;
}

.search__btn img {
  width: 100%;
  height: 100%;
}
</style>
