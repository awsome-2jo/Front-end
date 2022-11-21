<template>
  <div ref="list" class="news-container">
    <div class="search-area">
      <form name="d">
        <text-input icon="search" :value="query" @on-change="setQuery" />
        <button @click.prevent="onSearch" style="display: none"></button>
      </form>
    </div>
    <news-item v-for="(item, idx) in list" :key="`naver-news-${idx}`" :data="item" />
  </div>
</template>

<script>
import { getNews } from "@/api/naver.js";
import NewsItem from "./NewsItem.vue";
import TextInput from "@/components/common/TextInput.vue";

export default {
  components: { NewsItem, TextInput },
  name: "NewsList",
  data() {
    return {
      list: [],
      query: "",
      display: 12,
      start: 1,
      sort: "sim",
    };
  },
  methods: {
    setQuery(value) {
      this.query = value;
    },
    getList() {
      const tempItem = {
        title: "부동산 공시가 70%대→60%대로…‘공시가 현실화율’ 손본다",
        originallink: "https://n.news.naver.com/mnews/article/018/0005370844?sid=101",
        image: "https://imgnews.pstatic.net/image/018/2022/11/20/0005370844_001_20221120193401123.jpg",
        description:
          "최근 집값이 하락하면서 실거래가보다 공시가격이 높은 ‘역전현상’이 속출하고 있다. 정부가 부동산 공시가격 현실화율을 로드맵 수립 이전인 2020년 수준으로 돌려 집값보다 비싼 공시가격을 낮추겠다는 계획이다. 집값 하",
      };
      let list = [];
      for (let i = 0; i < 12; i++) {
        list.push(tempItem);
      }
      this.list = [...this.list, ...list];
    },
    scrollEvent() {
      if (this.$refs.list.scrollHeight - window.scrollY < 900) {
        this.getList();
      }
    },
  },
  created() {
    let params = {
      query: this.query,
      display: this.display,
      start: this.start,
      sort: this.sort,
    };
    const resolve = (res) => {
      console.log(res);
    };
    const reject = (error) => {
      console.log(error);
    };
    getNews(params, resolve, reject);
  },
  mounted() {
    this.getList();

    // 무한 스크롤 이벤트
    window.addEventListener("scroll", this.scrollEvent);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
};
</script>

<style scoped>
.news-container {
  width: 100%;
  max-width: 1020px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.search-area {
  width: 100%;
  margin: auto;
  height: 50px;
  display: flex;
  padding: 0 5px;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
}
</style>
