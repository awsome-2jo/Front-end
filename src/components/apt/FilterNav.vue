<template>
  <nav>
    <div>
      <div class="select-component">
        <select-box :select="sido()" :options="sidoList()" default="광역시/도" @on-change="setSido" />
        <select-box :select="gugun()" :options="gugunList()" default="시/군/구" @on-change="setGugun" />
        <select-box :select="dong()" :options="dongList()" default="동/읍/면" @on-change="setDong" />
      </div>
      <div class="search-component"><text-input icon="search" /></div>
    </div>
  </nav>
</template>

<script>
import SelectBox from "@/components/common/SelectBox";
import TextInput from "../common/TextInput.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "FilterNav",
  components: { SelectBox, TextInput },
  data() {
    return {
      ...mapState("AptStore", ["sido", "gugun", "dong", "sidoList", "gugunList", "dongList"]),
    };
  },
  methods: {
    ...mapActions("AptStore", ["setSido", "setGugun", "setDong"]),
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 60px;
  z-index: 9000;
  border-bottom: 1px solid var(--gray);
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  position: sticky;
  background-color: var(--white);
}
nav > div {
  margin: auto;
  width: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: space-between;
}
.select-component {
  display: flex;
}
.select-component > * {
  margin-left: 10px;
}
</style>
