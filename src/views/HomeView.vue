<template>
  <main class="home">
    <div class="background">
      <div class="back-building pre" v-html="background"></div>
      <div class="back-building" v-html="background"></div>
      <div class="back-building next" v-html="background"></div>
      <div class="front-building pre" v-html="background"></div>
      <div class="front-building" v-html="background"></div>
      <div class="front-building next" v-html="background"></div>
    </div>
  </main>
</template>

<script>
import building from "@/assets/imgs/building";
export default {
  name: "HomeView",
  data() {
    return {
      background: building,
    };
  },
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
.background {
  width: 100%;
  height: 680px;
  background-color: var(--navy);
  position: relative;
  overflow: hidden;
}
.back-building {
  width: 80%;
  height: 480px;
  position: absolute;
}
.front-building {
  width: 100%;
  height: 680px;
  position: absolute;
  animation: displace 10s linear infinite;
}
.pre{
  animation-name: displace-pre;
}
.next{
  animation-name: displace-next;
}
</style>
