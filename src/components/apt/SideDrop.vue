<template>
  <div class="component">
    <div class="handler drag-block" @mousedown="mouseDownHandler">
      <span>|||</span>
    </div>
    <div class="content" ref="side">
      <ul v-if="regcode()">
        <li v-for="(item, idx) of list" :key="`apt-item-${idx}`">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/apis/http.js";

export default {
  name: "SideDrop",
  data() {
    return {
      x: 0,
      list: [],
      ...mapState(["regcode"]),
    };
  },
  methods: {
    /******* 핸들러 마우스 이벤트 *******/
    mouseDownHandler() {
      window.addEventListener("mousemove", this.mouseMoveHandler);
      window.addEventListener("mouseup", this.mouseUpHandler);
    },
    mouseUpHandler() {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
      window.removeEventListener("mouseup", this.mouseUpHandler);
      // 현재 x값에 따라 지정된 4개의 위치로 x 값 설정
      if (this.x < window.innerWidth / 6) {
        this.x = 0;
      } else if (this.x < window.innerWidth / 3) {
        this.x = window.innerWidth / 4;
      } else if (this.x < window.innerWidth / 1.5) {
        this.x = window.innerWidth / 2;
      } else {
        this.x = window.innerWidth;
      }
    },
    mouseMoveHandler($event) {
      this.x = window.innerWidth - $event.x - 15;
    },

    /******** 지역코드에 따른 데이터 출력 함수 ********/
    getList() {
      console.log(this.regcode());
      http.get(`apt/list?regcode=${this.regcode()}&amount=20`).then((res) => (this.list = res.data));
    },
  },
  computed: {
    getRegcode() {
      return this.regcode();
    },
  },
  watch: {
    // x값 변경에 따라 side 컴포넌트 너비 조정
    x() {
      this.$refs.side.style.width = `${this.x}px`;
    },
    getRegcode() {
      this.getList();
    },
  },
};
</script>

<style scoped>
.component {
  z-index: 8000;
  height: calc(100% - 140px);
  position: absolute;
  right: 0;
  display: flex;
}
.component::before {
  content: "";
  height: 100px;
  width: 30px;
  top: 20px;
  position: absolute;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: var(--navy);
  box-shadow: -2px 0px 10px var(--shadow);
}
.handler {
  height: 100px;
  width: 30px;
  z-index: 1;
  margin-top: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: var(--navy);
  cursor: pointer;
  display: flex;
  align-items: center;
}
.handler * {
  font-size: 70px;
  letter-spacing: -15px;
  margin-left: -2px;
  opacity: 0.3;
}
.content {
  width: 25vw;
  margin-top: -1px;
  background-color: var(--white);
  border: 1px solid var(--gray);
  box-shadow: -2px 0px 10px var(--shadow);
  box-sizing: border-box;
  transition: all 0.1s ease-out;
  overflow: hidden;
}
</style>
