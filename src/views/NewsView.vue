<template>
  <main>
    <div class="main-header drag-block">
      <div>
        <h1>부동산 소식</h1>
        <span>오늘의 아파트・부동산 소식을 알아보세요</span>
      </div>
    </div>
    <news-list />
  </main>
</template>

<script>
import NewsList from "@/components/news/NewsList.vue";
export default {
  name: "NewsView",
  components: {
    NewsList,
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
main > div {
  width: 100%;
}
.main-header {
  background-color: var(--navy);
  color: var(--white);
  width: 100%;
  height: 160px;
}
.main-header > div {
  width: 100%;
  max-width: 1020px;
  padding: 0 10px;
  box-sizing: border-box;
  margin: auto;
}
.main-header h1 {
  margin: 75px 0 5px;
}
</style>
