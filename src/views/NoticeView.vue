<template>
  <main>
    <div class="main-header drag-block">
      <div>
        <h1>공지사항</h1>
        <span>업데이트 소식 및 이벤트를 확인해보세요</span>
      </div>
    </div>
  <router-view />
  </main>
</template>

<script>
export default {
  name: "NoticeView",
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
