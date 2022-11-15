<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view />
  </div>
</template>

<script>
import TopNav from "./components/common/TopNav.vue";

export default {
  components: { TopNav },
};
</script>

<style>
/* COLORS 상수 지정 */
:root {
  --black: #000;
  --white: #fff;
  --navy: #1c256f;
  --blue: #1c7eeb;
  --skyblue: #38d1f5;
  --red: #f13333;
  --orange: #f87523;
  --yellow: #ffc01e;
  --gray: #f4f4f8;
  --darkgray: #d6d6d6;
  --shadow: rgba(0, 0, 0, 0.2);
}

/* 네이버 나눔스퀘어 글꼴 */
@font-face {
  font-family: "NanumSquare_ac";
  src: url("@/font/NanumSquare_acR.ttf") format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "NanumSquare_ac";
  src: url("@/font/NanumSquare_acB.ttf") format("truetype");
  font-weight: bold;
}
@font-face {
  font-family: "NanumSquare_ac";
  src: url("@/font/NanumSquare_acEB.ttf") format("truetype");
  font-weight: bolder;
}
@font-face {
  font-family: "NanumSquare_ac";
  src: url("@/font/NanumSquare_acL.ttf") format("truetype");
  font-weight: lighter;
}

/* Google Inter 글꼴 */
@font-face {
  font-family: "Inter";
  src: url("@/font/Inter-Regular.ttf") format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "Inter";
  src: url("@/font/Inter-Bold.ttf") format("truetype");
  font-weight: bold;
}
@font-face {
  font-family: "Inter";
  src: url("@/font/Inter-ExtraBold.ttf") format("truetype");
  font-weight: bolder;
}
@font-face {
  font-family: "Inter";
  src: url("@/font/Inter-Light.ttf") format("truetype");
  font-weight: lighter;
}

/* 드래그 방지 속성 */
.drag-block {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 스크롤 없는 페이지 */
.non-scroll {
  height: 100%;
}

body {
  margin: 0;
  /* font-family: "NanumSquare_ac", Avenir, Helvetica, Arial, sans-serif; */
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  top: 0;
  background-color: var(--white);
  z-index: 10000;
  position: fixed;
}
main {
  padding-top: 80px;
  z-index: 1000;
}
</style>
