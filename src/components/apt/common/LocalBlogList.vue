<template>
  <div class="topic-container">
    <h2>지역 부동산 블로그<a href="#">더보기 ></a></h2>
    <ul>
      <news-mini-item v-for="(item, idx) in list" :key="`news-mini-item-${idx}`" :data="item" />
    </ul>
  </div>
</template>

<script>
import { getBlog } from "@/api/naver";
import { mapState } from "vuex";
import NewsMiniItem from "@/components/news/NewsMiniItem.vue";
export default {
  components: { NewsMiniItem },
  name: "localBlogList",
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState("AptStore", ["sido", "gugun", "dong", "regcode"]),
  },
  created() {
    this.getBlog();
  },
  watch: {
    regcode() {
      this.getBlog();
    },
  },
  methods: {
    getBlog() {
      let params = {
        query: this.dong ? this.gugun + " " + this.dong : this.gugun ? this.sido + " " + this.gugun : this.sido,
        display: 3,
        start: 1,
      };
      const resolve = (res) => {
        this.list = res.data;
        console.log(res);
      };
      const reject = (err) => {
        console.log(err);
      };
      getBlog(params, resolve, reject);
    },
  },
};
</script>

<style scoped>
.topic-container {
  height: auto;
  margin: 10px 20px;
}
.topic-container > h2 {
  background-color: var(--navy);
  margin-top: 25px;
  padding: 15px;
  font-size: 18px;
  color: var(--white);
  position: relative;
}
.topic-container > h2 > a {
  display: block;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  color: var(--white);
}
.topic-container > ul {
  margin: 0;
  padding: 0;
  width: 100%;
}
.topic-container > ul > li {
  margin: 0;
  list-style-type: none;
  width: 100%;
}
</style>
