<template>
  <div class="component">
    <div class="handler drag-block" @mousedown="mouseDownHandler">
      <span>|||</span>
    </div>
    <div class="content" ref="side">내용내용</div>
  </div>
</template>

<script>
export default {
  name: "SideDrop",
  data() {
    return {
      x: 0,
    };
  },
  methods: {
    mouseDownHandler() {
      window.addEventListener("mousemove", this.mouseMoveHandler);
      window.addEventListener("mouseup", this.mouseUpHandler);
    },
    mouseUpHandler() {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
      window.removeEventListener("mouseup", this.mouseUpHandler);

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
      this.x = window.innerWidth - $event.x - 30;
    },
  },
  watch: {
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
  top: 20px;
  position: absolute;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: var(--navy);
  box-shadow: -4px 4px 5px var(--darkgray);
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
  box-shadow: -4px 4px 5px var(--darkgray);
  box-sizing: border-box;
  transition: all 0.1s ease-out;
  overflow: hidden;
}
</style>
