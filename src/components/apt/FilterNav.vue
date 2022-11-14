<template>
  <nav>
    <div>
      <select-box :select="select" :options="options" @on-change="setSelect" />
      <select-box :select="select" :options="options" @on-change="setSelect" />
      <select-box :select="select" :options="options" @on-change="setSelect" />
    </div>
  </nav>
</template>

<script>
import SelectBox from "@/components/common/SelectBox";
export default {
  name: "FilterNav",
  components: { SelectBox },
  data() {
    return {
      select: "default",
      options: ["속성 1", "속성 2", "속성 3", "속성 4", "속성 5", "속성 6", "속성 7"],
    };
  },
  methods: {
    setSelect(select) {
      this.select = select;
    },
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
  width: 1080px;
  display: flex;
}
nav > div > * {
  margin-left: 10px;
}
</style>
