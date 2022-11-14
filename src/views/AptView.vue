<template>
  <main>
    <filter-nav />
    <kakao-map />
    <side-drop />
  </main>
</template>

<script>
import FilterNav from "../components/apt/FilterNav.vue";
import SideDrop from "../components/apt/SideDrop.vue";
import KakaoMap from "../components/apt/KakaoMap.vue";

export default {
  components: { SideDrop, FilterNav, KakaoMap },
  name: "AptMap",
};
</script>

<style></style>
