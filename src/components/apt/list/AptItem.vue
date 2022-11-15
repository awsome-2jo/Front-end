<template>
  <div class="component">{{ data }}</div>
</template>

<script>
export default {
  name: "AptItem",
  props: {
    data: Object,
  },
};
</script>

<style scoped>
.component {
  width: 100%;
  height: 125px;
  margin-bottom: 10px;
  background-color: var(--yellow);
  overflow: hidden;
}
</style>
