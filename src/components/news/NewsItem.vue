<template>
  <div @click="movePage" class="news-item">
    <div class="container">
      <div class="img-container">
        <img :src="data.image" :alt="data.title" />
      </div>
      <div class="text-container">
        <h3 v-html="data.title"></h3>
        <span v-html="data.description"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    data: Object,
  },
  data() {
    return {
      image: "",
    };
  },
  methods: {
    movePage() {
      window.location = this.data.originallink;
    },
  },
  created() {},
};
</script>

<style scoped>
.news-item {
  width: 25%;
  padding: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.container {
  height: 300px;
  border: 1px solid var(--gray);
  overflow: hidden;
  justify-content: space-between;
  position: relative;
  transition: all 0.1s linear;
  box-shadow: 1px 1px 5px var(--shadow);
}
.container:hover {
  transform: scale(105%);
  opacity: 0.75;
  z-index: 1;
}
.news-item .img-container {
  width: 100%;
  height: 160px;
  overflow: hidden;
  position: relative;
}
.news-item .img-container > img {
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.news-item h3 {
  font-size: 16px;
  margin: 10px 0;
}
.text-container {
  font-size: 14px;
  padding: 0 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.text-container::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 15%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  left: 0;
  bottom: 0;
}
</style>
