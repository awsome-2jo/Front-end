<template>
  <div>
    뉴스 목록
  </div>
</template>

<script>
import {getNews} from "@/api/naver.js";

export default {
  name: "NewsList",
  data() {
    return {
      list: [],
      query: "",
      display: "",
      start: "",
      sort: "",
    }
  },

  created() {
    const params = {
      query: this.query,
      display: this.display,
      start: this.start,
      sort: this.sort,
    };
    const resolve = (res) => {
      this.list = res.data;
      console.log(res.data)
    };
    const reject = (error) => {
      console.log(error);
    }
    getNews(params, resolve, reject);
  }
}
</script>

<style>

</style>