<template>
  <div class="component">
    <div class="icon-area">
      <font-awesome-icon :icon="`fa-solid ${iconArr[icon]}`" />
    </div>
    <div>
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconDataBox",
  props: {
    icon: String,
    label: String,
    value: String,
  },
  data() {
    return {
      iconArr: {
        dollar: "fa-sack-dollar",
        folder: "fa-folder-open",
        up: "fa-circle-up",
        down: "fa-circle-down",
        chart: "fa-square-poll-vertical",
        subway: "fa-train-subway",
        bus: "fa-bus",
        school: "fa-schoo",
        handshake: "fa-handshake-simple",
      },
    };
  },
};
</script>

<style scoped>
.component {
  background-color: var(--navy);
  width: 100%;
  border-radius: 8px;
  color: var(--white);
  display: flex;
  align-items: center;
  padding: 6px 12px;
}
.icon-area {
  font-size: 40px;
  margin-right: 10px;
}
.label {
  font-size: 12px;
  margin-bottom: 2px;
  white-space: nowrap;
}
.value {
  font-size: 16px;
  font-weight: 900;
  white-space: nowrap;
}
</style>
