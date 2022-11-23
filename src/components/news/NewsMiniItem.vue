<template>
  <li @click="movePage">
    <div class="news-item">
      <div class="img-container">
        <img :src="image" referrerpolicy="no-referrer" :alt="data.title" @error="replaceByDefault" />
      </div>
      <div class="text-container">
        <h3 v-html="data.title.trim()"></h3>
        <span v-html="data.description.trim()"></span>
      </div>
    </div>
  </li>
</template>

<script>
import defaultImg from "@/assets/imgs/default-news.png";
export default {
  name: "NewsMiniItem",
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
  margin: 5px 0 20px;
  box-sizing: content-box;
  height: 120px;
  display: flex;
  /* border: 1px solid var(--gray); */
  overflow: hidden;
  justify-content: space-between;
  position: relative;
  transition: all 0.1s linear;
  cursor: pointer;
  border-radius: 8px;
}
.news-item:hover {
  background-color: var(--gray);
  opacity: 0.5;
  z-index: 1;
}
.news-item:hover .img-container > img {
  transform: scale(102%) translate(-50%, -50%);
}
.img-container {
  width: 40%;
  height: 120px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  background: var(--gray);
}
.img-container > img {
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s linear;
}
.news-item h3 {
  font-size: 16px;
  margin: 5px 0;
}
.text-container {
  width: 60%;
  font-size: 14px;
  padding: 0 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
</style>
