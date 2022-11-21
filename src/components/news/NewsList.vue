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
    addList(list) {
      this.list = [...this.list, ...list];
    },
    getList() {
      let params = {
        query: this.query,
        display: this.display,
        start: this.start,
        sort: this.sort,
      };
      this.start += this.display;
      const resolve = (res) => {
        console.log(res);
        this.addList(res.data);
      };
      const reject = (error) => {
        console.log(error);
      };
      getNews(params, resolve, reject);
    },
    scrollEvent() {
      if (this.$refs.list.scrollHeight - window.scrollY < 800) {
        this.getList();
      }
    },
  },
  created() {
    this.getList();
  },
  mounted() {
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
