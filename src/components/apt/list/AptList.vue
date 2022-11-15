<template>
  <ul>
    <!-- TODO: 분기처리. 목록 없는 경우 없음을 알림 -->
    <li v-for="(item, idx) of list" :key="`apt-item-${idx}`">
      <apt-item :data="item" />
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import http from "@/apis/http.js";
import AptItem from "./AptItem.vue";

export default {
  name: "AptList",
  components: { AptItem },
  data() {
    return {
      list: [],
      ...mapState(["regcode"]),
    };
  },
  methods: {
    /******** 지역코드에 따른 데이터 출력 함수 ********/
    getList() {
      console.log(this.regcode());
      http.get(`apt/list?regcode=${this.regcode()}&amount=20`).then((res) => (this.list = res.data));
    },
  },

  // 주소 변경 감지용 computed & watch
  computed: {
    getRegcode() {
      return this.regcode();
    },
  },
  watch: {
    getRegcode() {
      this.getList();
    },
  },
};
</script>

<style scoped>
ul {
  margin: 15px;
  box-sizing: border-box;
  width: auto;
  height: 100%;
  padding: 0;
  /* background-color: var(--red); */
  overflow-y: scroll;
}
ul > li {
  list-style: none;
}
ul::-webkit-scrollbar {
  position: absolute;
  border-radius: 3px;
  width: 8px;
  background-color: var(--white);
}
ul::-webkit-scrollbar-thumb {
  width: 8px;
  background-color: var(--darkgray);
  border-radius: 3px;
}
</style>
