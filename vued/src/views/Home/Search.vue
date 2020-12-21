<template>
  <!-- 检索结果 -->
  <div id="search">
    <m-app-header></m-app-header>
    <!-- 检索框 -->
    <div class="search">
      <search-advance :initSearch="$route.query" :isShow="isShow" />
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
          <m-click-dropdown
            @change-dropdown="changeOrder"
            :cur="order"
            type="click-search"
          />
        </div>
      </div>
      <div class="answer__main">
        <div class="main__aside">
          <search-dropdown
            @change-filter="changeFilter"
            type="作者"
            :typeList="authorList"
          />
          <search-dropdown
            @change-filter="changeFilter"
            type="文献来源"
            :typeList="venueList"
          />
          <search-dropdown
            @change-filter="changeFilter"
            type="文献年份"
            :typeList="yearList"
          />
          <div
            class="main__aside__btn"
            v-if="canFilter"
            type="info"
            @click="assureFilter"
          >
            筛选
          </div>
        </div>
        <div class="main__content">
          <div class="content__fstline">
            <div class="line__title">题名</div>
            <div class="line__author">作者</div>
            <div class="line__venue">来源</div>
            <div class="line__year">发表时间</div>
            <div class="line__ciation">被引</div>
            <div class="line__action">引用</div>
          </div>
          <ul class="content__list">
            <li
              v-for="(item, index) in splitList"
              @click="toLiterature(item)"
              :key="index"
            >
              <div class="content__secline--dark" v-if="index % 2 == 0">
                <div class="line__title">
                  {{ item.title }}
                </div>
                <div class="line__author">
                  <span v-for="(itemA, indexA) in item.authors" :key="indexA">
                    {{ itemA.realName }};
                  </span>
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
                <div class="line__action">
                  <img
                    @click="openRef"
                    src="@/assets/icons/search/ref.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="content__secline" v-else>
                <div class="line__title">
                  {{ item.title }}
                </div>
                <div class="line__author">
                  <span v-for="(itemA, indexA) in item.authors" :key="indexA">
                    {{ itemA.realName }};
                  </span>
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
                <div class="line__action">
                  <img
                    @click="openRef"
                    src="@/assets/icons/search/ref.png"
                    alt=""
                  />
                </div>
              </div>
            </li>
          </ul>
          <div class="content__page">
            <span class="total"> 共 {{ totalPage }} 页 </span>
            <ul class="page">
              <a @click="changePage(1)" href="javascript:void(0);">首页</a>
              <a @click="changePage('down')" href="javascript:void(0);">
                上一页
              </a>
              <li v-for="item in totalPage" :key="item">
                <span v-if="item == curPage" class="cur">{{ item }}</span>
                <a
                  v-else-if="item >= curPage && item <= curPage + 7"
                  @click="changePage(item)"
                  href="javascript:void(0);"
                >
                  {{ item }}
                </a>
              </li>
              <a @click="changePage('up')" href="javascript:void(0);">下一页</a>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 引文链接 -->
    <m-hover ref="hover">
      <input type="text" id="input" :value="order" readonly="" />
      <span
        v-clipboard:copy="order"
        v-clipboard:success="onCopy"
        v-clipboard:error="onCopyError"
      >
        复制
      </span>
    </m-hover>
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
      order: "ciation",
      curPageList: [1, 2, 3, 4, 5],
      curPage: 1,
      answer: {
        num: "3,567",
        query: "1884-2021: ((covid) WN ALL)"
      },
      authorList: [],
      yearList: [],
      venueList: [],
      targetList: [],
      sourceList: [],
      authorFilter: [],
      venueFilter: [],
      yearFilter: []
    };
  },
  created() {
    console.log(this.$route.query);
    let query = this.$route.query;
    console.log(this.$store.state.searchRes)
    // 按相关度排序的lit
    this.litList1 = this.$store.state.searchRes.literatureList1;
    // 按被引数排序的lit
    this.litList2 = this.$store.state.searchRes.literatureList2;
    // 按发表时间排序的lit
    this.litList3 = this.$store.state.searchRes.literatureList3;
    this.authorList = this.$store.state.searchRes.authorList;
    this.venueList = this.$store.state.searchRes.venueList;
    this.yearList = this.$store.state.searchRes.yearList;
    this.sourceList = this.litList1;
    this.targetList = this.sourceList;
  },
  computed: {
    // 是否展示筛选框
    canFilter() {
      // return (
      //   this.authorFilter.length != 0 ||
      //   this.venueFilter.length != 0 ||
      //   this.yearFilter.length != 0
      // );
      return true;
    },
    isAdvance() {
      return this.$store.state.isAdvance;
    },
    // 分页
    totalPage() {
      return parseInt(this.targetList.length / 12) + 1;
    },
    splitList() {
      return this.targetList.slice((this.curPage - 1) * 12, this.curPage * 12);
    }
  },
  methods: {
    onCopy() {
      this.$message.success("复制成功！");
      this.$ref.hover.hideHover();
    },
    onCopyError() {
      this.$message.error("复制失败");
    },
    toLiterature(item) {
      this.$router.push({
        path: "/literature",
        query: { literatureID: item.literatureID }
      });
    },
    openRef() {
      this.$refs.hover.showHover({
        title: "引用"
      });
    },
    changePage(item) {
      if (item == "down")
        this.curPage = this.curPage - 1 >= 1 ? this.curPage - 1 : 1;
      else if (item == "up")
        this.curPage =
          this.curPage + 1 <= this.totalPage
            ? this.curPage + 1
            : this.totalPage;
      else this.curPage = item;
    },
    changeShow() {
      this.isShow = !this.isShow;
    },
    changeOrder(e) {
      console.log(e);
      this.order = e;
      if (e == "ciation") this.sourceList = this.litList1;
      else this.sourceList = this.litList2;
      this.assureFilter();
    },
    collect(e) {
      this.targetList[e].collect = true;
    },
    uncollect(e) {
      this.targetList[e].collect = false;
    },
    changeFilter(e) {
      // 监听子传父事件，将需要filter的字段传给父组件
      console.log(e);
      let list = e.list;
      let type;
      switch (e.type) {
        case "作者":
          type = "author";
          this.authorFilter = list;
          break;
        case "文献来源":
          type = "venue";
          this.venueFilter = list;
          break;
        case "文献年份":
          type = "year";
          this.yearFilter = list;
          break;
      }
    },
    assureFilter() {
      this.curPage = 1;
      this.targetList = this.sourceList.filter(n => {
        if (
          this._inAuthor(n.author) &&
          this._inVenue(n.venue) &&
          this._inYear(n.year)
        )
          return n;
      });
    },
    _inAuthor(author) {
      // 筛选作者
      if (this._otherAuthor(author)) return true;
      let check = false;
      author.forEach(element => {
        if (this._inList(element, this.authorFilter)) check = true;
      });
      if (check) return true;
      return false;
    },
    _otherAuthor(author) {
      // 特判other
      if (this._inList("Other", this.authorFilter)) {
        let check = true;
        this.authorList.forEach(n => {
          if (author == n.key) check = false;
        });
        if (check) return true;
      }
      return false;
    },
    _inVenue(venue) {
      // 筛选来源
      if (this._otherVenue(venue)) return true;
      return this._inList(venue, this.venueFilter);
    },
    _otherVenue(venue) {
      // 特判其他
      if (this._inList("Other", this.venueFilter)) {
        let check = true;
        this.venueList.forEach(n => {
          if (venue == n.key) check = false;
        });
        if (check) return true;
      }
      return false;
    },
    _inYear(year) {
      // 筛选年份
      if (this._otherYear(year)) return true;
      return this._inList(year, this.yearFilter);
    },
    _otherYear(year) {
      // 特判年份其他
      if (this._inList("Other", this.yearFilter)) {
        let check = true;
        this.yearList.forEach(n => {
          if (year == n.key) check = false;
        });
        if (check) return true;
      }
      return false;
    },
    _inList(item, list) {
      let check = false;
      if (list.length == 0) return true;
      list.forEach(n => {
        if (item == n) check = true;
      });
      if (check) return true;
      return false;
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
  border-right: 1px solid #f2f2f2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 16%;
}

.main__aside__btn {
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  cursor: pointer;
  height: 30px;
  padding: 0 15px;
  line-height: 30px;
  margin: 10px auto;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.main__aside__btn:hover {
  background-color: var(--color-main);
  color: #fff;
}

.main__content {
  width: 85%;
  font-size: 14px;
}

.content__list {
  max-height: 750px;
  overflow: hidden;
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
  min-height: 60px;
  max-height: 60px;
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
  width: 10%;
}

.line__ciation {
  width: 8%;
}

.line__action {
  align-items: center;
  display: flex;
  width: 7%;
}

.line__action img {
  height: 16px;
  width: 16px;
}

.line__action__collect {
  display: flex;
  justify-content: flex-start;
  height: 16px;
  width: 16px;
  overflow: hidden;
}

.line__action__collect .collect {
  transform: translateX(-16px);
}

.line__action__collect {
  /* transform: translateX(-16px); */
}

.line__action__ref {
  margin-left: 5px;
}

.search {
  border-bottom: 1px solid #e4e4e4;
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

.content__page {
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  width: 100%;
  white-space: nowrap;
}

.content__page .total {
  margin-right: 10px;
  line-height: 20px;
}

.content__page .page {
  align-items: center;
  display: flex;
}

.content__page a,
.content__page .cur {
  font-size: 12px;
  line-height: 12px;
  overflow: hidden;
  padding: 4px 8px;
  margin-right: 10px;
  border: 1px solid #e4e4e4;
}

.content__page .cur {
  color: #fff;
  background-color: var(--color-tint);
}
</style>
