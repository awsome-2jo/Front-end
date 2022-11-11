<template>
  <div class="select-container drag-block" :class="{ open: open }" @click="toggleOpen">
    <div class="select">
      {{ select }}
      <font-awesome-icon class="down-icon" icon="fa-solid fa-chevron-down" />
    </div>
    <template v-if="open">
      <ul class="scroll">
        <li
          v-for="(item, idx) of options"
          :key="`option-key-${idx}`"
          class="option"
          :class="{ selected: select === item }"
          @click="changeOption(item)"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    select: String,
    options: Array,
  },
  data() {
    return {
      open: false,
    };
  },

  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    changeOption(option) {
      this.$emit("on-change", option);
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
  transition: all 0.1s linear;
}
.select-container .down-icon {
  position: absolute;
  right: 10px;
  width: 20px;
  top: 10px;
  transition: all 0.1s linear;
}
.select-container.open .down-icon {
  transform: rotate(180deg);
}
.select-container.open {
  height: 200px;
  overflow: hidden;
}
.select-container.open .select {
  background-color: var(--gray);
}
.select {
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  border: 0;
  line-height: 28px;
  padding: 0 10px;
  color: var(--navy);
  transition: all 0.1s linear;
}
.scroll {
  padding: 0;
  width: 100%;
  height: 150px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: 5px;
}
.scroll::-webkit-scrollbar {
  position: absolute;
  border-radius: 3px;
  width: 6px;
  background-color: var(--white);
}
.scroll::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: var(--navy);
  border-radius: 3px;

}
.option {
  box-sizing: border-box;
  width: 100%;
  color: var(--navy);
  font-size: 16px;
  line-height: 28px;
  padding: 1px 10px;
  list-style: none;
}
.option:hover {
  background-color: var(--gray);
}
.option.selected {
  background-color: var(--gray);
}
</style>
