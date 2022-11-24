<template>
  <div @click="movePage" class="news-item">
    <div class="container">
      <div class="img-container">
        <img :src="image" referrerpolicy="no-referrer" :alt="data.title" @error="replaceByDefault" />
      </div>
      <div class="text-container">
        <h3 v-html="data.title.trim()"></h3>
        <span v-html="data.description.trim()"></span>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "@/assets/imgs/default-news.png";
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
  watch: {
    data() {
      this.setImg();
    },
  },
  methods: {
    movePage() {
      window.location = this.data.originallink;
    },
    replaceByDefault() {
      this.image = defaultImg;
    },
    setImg() {
      this.image = this.data.image;
      if (!this.image.match(/(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi)) {
        let root = this.data.originallink.match(/(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi)[0];
        this.image = root + this.image;
      }
    },
  },
  created() {
    this.setImg();
  },
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
  background-color: var(--gray);
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
