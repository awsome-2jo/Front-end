<template>
  <div :class="{ on: value, off: !value }" @click="toggle">
    <div class="ball"></div>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: { value: Boolean },
  methods: {
    toggle() {
      this.$emit("event");
    },
  },
};
</script>

<style scoped>
div {
  width: 60px;
  height: 24px;
  border-radius: 15px;
  position: relative;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.4);
  transition: all 0.1s linear;
}
.on {
  background-color: var(--navy);
}
.ball {
  transition: all 0.1s linear;
}
.on::before {
  content: "ON";
  position: absolute;
  color: var(--white);
  font-weight: 900;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
}
.on .ball {
  width: 16px;
  height: 16px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 4px var(--black);
  transform: translate(4px, 4px);
}
.on:hover .ball {
  transform: translate(4px, 4px) scale(120%);
  transition: all 0.1s linear;
}
.off {
  background-color: var(--darkgray);
}
.off::before {
  content: "OFF";
  position: absolute;
  color: var(--black);
  opacity: 0.5;
  font-weight: 900;
  font-size: 12px;
  top: 50%;
  right: 45%;
  transform: translate(0, -50%);
}
.off .ball {
  width: 16px;
  height: 16px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 4px var(--black);
  transform: translate(calc(40px), 4px);
}
.off:hover .ball {
  transform: translate(calc(40px), 4px) scale(120%);
  transition: all 0.1s linear;
}
</style>
