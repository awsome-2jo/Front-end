<template>
  <main class="home" ref="main">
    <div class="background">
    <top-nav-clear />
      <div class="back-building pre" v-html="background.back"></div>
      <div class="back-building" v-html="background.back"></div>
      <div class="back-building next" v-html="background.back"></div>
      <div class="title">
        <span>오직 당신만을 위한 아파트 거래정보 사이트</span>
        <h1>HOME:IN</h1>
      </div>
      <div class="front-building pre" v-html="background.front"></div>
      <div class="front-building" v-html="background.front"></div>
      <div class="front-building next" v-html="background.front"></div>
    </div>
  </main>
</template>

<script>
import building2 from "@/assets/imgs/building2.js";
import building from "@/assets/imgs/building.js";
import TopNavClear from "@/components/common/TopNavClear.vue";
export default {
  components: { TopNavClear },
  name: "HomeView",
  data() {
    return {
      background: {
        front: building,
        back: building2,
      }
    };
  },
  methods: {
    setZindex($event) {
      // console.log($event.currentTarget.scrollY);
      if($event.currentTarget.scrollY>500) this.$refs.main.style.zIndex = 1;
      else this.$refs.main.style.zIndex = 10000;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.setZindex);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setZindex);
  }
};
</script>

<style scoped>
@keyframes displace {
  from { margin-left: 100%;}
  to { margin-left: 0}
}
@keyframes displace-pre {
  from { margin-left: 0}
  to { margin-left: -100%}
}
@keyframes displace-next {
  from { margin-left: 200%}
  to { margin-left: 100%}
}
.home {
  z-index: 10000;
  position: relative;
  margin-top: -80px;
  height: 200vh;
}
.home::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
.background {
  width: 100%;
  height: 580px;
  background-color: var(--navy);
  position: relative;
  overflow: hidden;
}
.background .title {
  z-index: 50;
  width: 100%;
  height: 580px;
  position: absolute;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.background .title span {
font-size: 18px;
}
.background .title h1 {
  font-size: 75px;
  font-weight: 900;
  margin: 0;
}
.back-building {
  z-index: 1;
  width: 100%;
  height: 700px;
  position: absolute;
  animation: displace 97s linear infinite;
}
.front-building {
  z-index: 1000;
  width: 100%;
  height: 850px;
  position: absolute;
  animation: displace 23s linear infinite;
}
.pre{
  animation-name: displace-pre;
}
.next{
  animation-name: displace-next;
}
</style>
