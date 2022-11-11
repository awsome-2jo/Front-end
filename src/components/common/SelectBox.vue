<template>
  <div class="select-container drag-block" :class="{ open: open }" @click="toggleOpen">
    <div class="select">
      {{ select }}
      <font-awesome-icon class="down-icon" icon="fa-solid fa-chevron-down" />
    </div>
    <template v-if="open">
      <div
        v-for="(item, idx) of options"
        :key="`option-key-${idx}`"
        class="option"
        :class="{ selected: select === item }"
        @click="changeOption(item)"
      >
        {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  data() {
    return {
      open: false,
      select: "test1",
      options: ["test1", "test2", "test3", "test4", "test5", "test6"],
    };
  },

  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    changeOption(option) {
      this.select = option;
      this.open = false;
    },
  },
};
</script>

<style scoped>
.select-container {
  box-sizing: border-box;
  width: 150px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid var(--navy);
  background-color: var(--white);
  padding: 4px;
  position: relative;
}
.down-icon {
  position: absolute;
  right: 10px;
  width: 20px;
  top: 10px;
}
.select-container.open {
  height: auto;
}
.select-container.open .select {
  background-color: var(--gray);
}
.select {
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  border: 0;
  line-height: 26px;
  padding: 0 10px;
  color: var(--navy);
}
.option {
  color: var(--navy);
  font-size: 16px;
  line-height: 28px;
  padding: 1px 10px;
}
.option:hover {
  background-color: var(--gray);
}
.option.selected {
  background-color: var(--gray);
}
</style>
