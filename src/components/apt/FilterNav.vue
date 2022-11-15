<template>
  <nav>
    <div>
      <div class="select-component">
        <select-box :select="sido()" :options="sidoList()" @on-change="setSido" />
        <select-box :select="gugun()" :options="gugunList()" @on-change="setGugun" />
        <select-box :select="dong()" :options="dongList()" @on-change="setDong" />
      </div>
      <div class="search-component">
        <text-input />
      </div>
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
      ...mapState(["sido", "gugun", "dong", "sidoList", "gugunList", "dongList"]),
      select: "default",
      options: ["속성 1", "속성 2", "속성 3", "속성 4", "속성 5", "속성 6", "속성 7"],
    };
  },
  methods: {
    setSelect(select) {
      this.select = select;
    },
    ...mapActions(["setSido", "setGugun", "setDong"]),
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
