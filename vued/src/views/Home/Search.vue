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
          <m-click-dropdown @change-dropdown="changeOrder" :cur="order" type="click-search" />
        </div>
      </div>
      <div class="answer__main">
        <div class="main__aside">
          <!-- <l-button>搜索</l-button> -->
          <search-dropdown type="作者" :typeList="authorList" />
          <search-dropdown type="文献来源" :typeList="venueList" />
          <search-dropdown type="文献年份" :typeList="affList" />
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
import MClickDropdown from "components/content/m-click-dropdown/m-click-dropdown";
export default {
  name: "Search",
  data() {
    return {
      isShow: false,
      isAdvance: false,
      order: "time",
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
          title: "A320/A330飞机起落架收放系统时序监控的可行性研究",
          author: "	朱毅; 赵红华; 程伟",
          venue: "航空维修与工程",
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
    },
    changeOrder(e) {
      console.log(e)
      this.order = e;
    }
  },
  components: {
    searchAdvance,
    searchDropdown,
    MClickDropdown
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
  height: 100vh;
}

.answer__header {
  align-items: flex-end;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  padding: 20px;
}

.header__num {
  float: left;
  padding-right: 10px;
  font-size: 16px;
  width: auto;
  line-height: 16px;
}

.header__query {
  font-size: 13px;
  flex: 1;
  line-height: 13px;
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
  width: 15%;
}

.main__content {
  width: 85%;
  font-size: 14px;
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
  justify-content: center;
  line-height: 21px;
  text-align: center;
}

.content__secline--dark {
  background-color: #f6f8fa;
}

.line__title,
.line__author,
.line__venue,
.line__year,
.line__ciation {
  padding: 10px 5px;
}

.line__title {
  flex: 1;
}

.line__author {
  width: 15%;
}

.line__venue {
  width: 13%;
}

.line__year {
  width: 75px;
}

.line__ciation {
  width: 8%;
}

.line__action {
  width: 10%;
}

.search {
  border: 1px solid #e4e4e4;
  background-color: #fff;
  border-radius: 5px;
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
