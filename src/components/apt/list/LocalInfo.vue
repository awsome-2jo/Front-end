<template>
  <div>
    <div class="icon-info-area">
      <icon-data-box />
      <div class="divider"></div>
      <icon-data-box />
    </div>
  </div>
</template>

<script>
import IconDataBox from "../common/IconDataBox.vue";
export default {
  components: { IconDataBox },
  name: "LocalInfo",
};
</script>

<style>
.icon-info-area {
  display: flex;
  padding: 5px;
}
.divider {
  width: 10px;
  height: 10px;
}
</style>
