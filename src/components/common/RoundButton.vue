<template>
  <button :class="type" class="drag-block" @click="onClick">{{ text }}</button>
</template>

<script>
export default {
  name: "RoundButton",
  props: {
    text: String,
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClick() {
      this.$emit("event");
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  box-sizing: border-box;
  width: 74px;
  height: 30px;
  background-color: var(--navy);
  border-radius: 15px;
  border: 1px solid var(--navy);
  color: var(--white);
  font-weight: 700;
  line-height: 28px;
  /* padding: 0 15px; */
  transition: all 0.05s linear;
}
button.line {
  background-color: var(--white);
  color: var(--navy);
  border: 1px solid var(--navy);
}
button:hover, button:active {
  transform: scale(105%);
}
</style>
