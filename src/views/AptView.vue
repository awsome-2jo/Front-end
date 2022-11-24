<template>
  <main class="apt-component">
    <filter-nav />
    <kakao-map />
    <place-nav />
    <side-drop />
  </main>
</template>

<script>
import FilterNav from "@/components/apt/FilterNav.vue";
import SideDrop from "@/components/apt/SideDrop.vue";
import KakaoMap from "@/components/apt/KakaoMap.vue";
import PlaceNav from "@/components/apt/PlaceNav.vue";

export default {
  components: { SideDrop, FilterNav, KakaoMap, PlaceNav },
  name: "AptMap",
};
</script>

<style>
/* 상단 그림자 NAV에 그림자 추가 */
.apt-component::before {
  content: "";
  width: 100%;
  height: 60px;
  z-index: 7999;
  border-bottom: 1px solid var(--gray);
  box-shadow: 0px 0px 10px var(--shadow);
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  background-color: var(--white);
}
</style>
