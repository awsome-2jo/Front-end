<template>
  <div class="component">
    <div class="handler drag-block" @mousedown="mouseDownHandler">
      <span>|||</span>
    </div>
    <div class="content" ref="side">
      <div class="address-header">{{ sido }} {{ gugun }} {{ dong }}</div>
      <div class="tap-container">
        <div :class="{ selected: mode === `info` }" @click="setMode('info')">지역 정보</div>
        <div :class="{ selected: mode === `list` }" @click="setMode('list')">아파트 목록</div>
      </div>
      <local-info v-if="mode === `info`" />
      <apt-list v-if="mode === `list`" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AptList from "@/components/apt/list/AptList.vue";
import LocalInfo from "@/components/apt/list/LocalInfo.vue";

export default {
  components: { AptList, LocalInfo },
  name: "SideDrop",
  data() {
    return {
      x: 0,
      list: [],
      mode: "list",
    };
  },
  methods: {
    /************* 모드 선택 이벤트 **************/
    setMode(mode) {
      this.mode = mode;
    },
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
  },
  computed: {
    ...mapState("AptStore", ["regcode", "sido", "gugun", "dong"]),
  },
  watch: {
    // x값 변경에 따라 side 컴포넌트 너비 조정
    x() {
      this.$refs.side.style.width = `${this.x}px`;
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
  margin-top: 60px;
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
  margin-top: 60px;
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
  height: 100%;
  margin-top: -2px;
  background-color: var(--white);
  border: 1px solid var(--gray);
  box-shadow: -2px 0px 10px var(--shadow);
  /* box-sizing: border-box; */
  transition: all 0.1s ease-out;
  overflow: hidden;
}
.address-header {
  height: 60px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  font-size: 16px;
  background-color: var(--gray);
}
.tap-container {
  height: 45px;
  display: flex;
}
.tap-container > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1.5px solid var(--darkgray);
  cursor: pointer;
}
.tap-container > div.selected {
  border-bottom: 3px solid var(--navy);
  color: var(--navy);
  font-weight: 900;
}
.tap-container > div:hover {
  color: var(--navy);
  opacity: 0.5;
}
</style>
