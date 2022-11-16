<template>
  <main class="home">
    <div class="background"></div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 680px;
  background-color: var(--navy);
  position: relative;
  overflow: hidden;
}
.background::before {
  content: "HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN HOME:IN";
  width: 140%;
  color: var(--navy);
  flex-wrap: wrap;
  font-weight: 900;
  font-size: 260px;
  line-height: 210px;
  position: absolute;
  top: -40%;
  left: -20%;
  text-shadow: 5px 10px 25px var(--black);
  opacity: 0.25;
  transform: rotate(-15deg);
}
</style>
