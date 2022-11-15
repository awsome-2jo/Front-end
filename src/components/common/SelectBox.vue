<template>
  <div class="select-container drag-block" :class="{ open: open }" @click="toggleOpen">
    <div class="select">
      {{ getSelect }}
      <font-awesome-icon class="down-icon" icon="fa-solid fa-chevron-down" />
    </div>
    <template v-if="open && options.length">
      <ul class="scroll">
        <li
          v-for="(item, idx) of options"
          :key="`option-key-${idx}`"
          class="option"
          :class="{ selected: select === item }"
          @click="changeOption(item)"
        >
          {{ item.text }}
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
    default: {
      type: String,
      default: "선택해주세요",
    },
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

  computed: {
    getSelect() {
      return this.select ? this.select : this.default;
    },
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.select-container {
  font-size: 14px;
  box-sizing: border-box;
  width: 150px;
  height: 40px;
  max-height: 40px;
  border-radius: 20px;
  border: 2px solid var(--navy);
  background-color: var(--white);
  padding: 4px;
  position: relative;
  transition: all 0.1s linear;
  overflow: hidden;
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
  height: fit-content;
  max-height: 200px;
}
.select-container.open .select,
.select:hover {
  background-color: var(--gray);
}
.select {
  cursor: pointer;
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
  max-height: 150px;
  height: fit-content;
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
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  color: var(--navy);
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
