<template>
  <div class="component">
    <div class="handler drag-block" @mousedown="mouseDownHandler">
      <span>|||</span>
    </div>
    <div ref="side" class="side-container">
      <div class="address-header">{{ sido }} {{ gugun }} {{ dong }}</div>
      <div class="content">
        <div class="reg-content">
          <div class="tap-container">
            <div :class="{ selected: mode === `info` }" @click="setMode('info')">지역 정보</div>
            <div :class="{ selected: mode === `list` }" @click="setMode('list')">아파트 목록</div>
          </div>
          <local-info v-if="mode === `info`" />
          <apt-list v-if="mode === `list`" />
        </div>
        <apt-detail />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AptList from "@/components/apt/list/AptList.vue";
import LocalInfo from "@/components/apt/list/LocalInfo.vue";
import AptDetail from "./detail/AptDetail.vue";

export default {
  components: { AptList, LocalInfo, AptDetail },
  name: "SideDrop",
  data() {
    return {
      x: 0,
      list: [],
      mode: "info",
    };
  },
  methods: {
    ...mapActions("AptStore", ["setSideX"]),
    /************* 모드 선택 이벤트 **************/
    setMode(mode) {
      this.mode = mode;
    },
    /******* 핸들러 마우스 이벤트 *******/
    mouseDownHandler() {
      window.addEventListener("mousemove", this.mouseMoveHandler);
      window.addEventListener("mouseup", this.mouseUpHandler);
      this.setSideX(0);
    },
    mouseUpHandler() {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
      window.removeEventListener("mouseup", this.mouseUpHandler);
      // 현재 x값에 따라 지정된 4개의 위치로 x 값 설정
      if (this.x < 200) {
        this.x = 0;
      } else if (this.x < 600) {
        this.x = 450;
      } else if (this.x < 1200) {
        this.x = 1000;
      } else {
        this.x = window.innerWidth;
      }
      this.setSideX(this.x);
    },
    mouseMoveHandler($event) {
      this.x = window.innerWidth - $event.x - 15;
    },
  },
  computed: {
    ...mapState("AptStore", ["regcode", "sido", "gugun", "dong", "target", "sideX"]),
  },
  watch: {
    // x값 변경에 따라 side 컴포넌트 너비 조정
    x() {
      this.$refs.side.style.width = `${this.x}px`;
    },
    target() {
      if (this.target && this.x < 1000) {
        this.setSideX(1000);
        this.x = 1000;
      }
    },
  },
  mounted() {
    this.x = 450;
    this.setSideX(this.x);
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
  /* overflow: hidden; */
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
.side-container {
  width: 0;
  background-color: var(--white);
  border: 1px solid var(--gray);
  box-shadow: -2px 0px 10px var(--shadow);
  /* box-sizing: border-box; */
  transition: all 0.1s ease-out;
  overflow: hidden;
}
.content {
  position: relative;
  display: flex;
  height: 100%;
  margin-top: -2px;
  overflow: hidden;
}
.reg-content {
  border-right: 1px solid var(--gray);
  max-width: 450px;
  min-width: 450px;
}
.address-header {
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  font-size: 16px;
  background-color: var(--gray);
  white-space: nowrap;
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
  padding-top: 3px;
  border-bottom: 3px solid var(--darkgray);
  cursor: pointer;
  transition: all 0.1s linear;
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
