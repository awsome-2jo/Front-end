<template>
  <div class="checkbox-container drag-block" @click="toggle">
    <label v-if="position === `left`">{{ text }}</label>
    <div class="checkbox" :class="{ on: value, off: !value }">
      <div></div>
    </div>
    <input type="checkbox" />
    <label v-if="position === `right`">{{ text }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckboxButton",
  props: {
    value: Boolean,
    text: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "right",
    },
  },
  methods: {
    toggle() {
      this.$emit("event");
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
}
input {
  display: none;
}
.checkbox {
  width: 15px;
  height: 15px;
  border: 2px solid var(--darkgray);
  border-radius: 5px;
  /* box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.15); */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.05s linear;
}
.checkbox div {
  width: 11px;
  height: 11px;
  background-color: var(--navy);
  border-radius: 2px;
  transition: all 0.1s linear;
}
.checkbox:hover {
  transform: scale(115%);
}
.checkbox.on div {
  transform: scale(100%);
}
.checkbox.off div {
  transform: scale(0%);
}
label {
  margin: 0 5px;
}
</style>
