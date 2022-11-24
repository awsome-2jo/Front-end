<template>
  <main class="home" ref="main">
    <div class="background">
    <top-nav-clear />
      <div class="back-building pre" v-html="background.back"></div>
      <div class="back-building" v-html="background.back"></div>
      <div class="back-building next" v-html="background.back"></div>
      <div class="title">
        <span>오직 당신만을 위한 아파트 거래정보 사이트</span>
        <h1>HOME:IN</h1>
      </div>
      <div class="front-building pre" v-html="background.front"></div>
      <div class="front-building" v-html="background.front"></div>
      <div class="front-building next" v-html="background.front"></div>
    </div>
    
    <div class="info-container left">
      <img src="@/assets/imgs/info/info1.png">
      <div>
        <h2>지역별 아파트 거래정보를 한눈에</h2>
        
        <span>아파트 실거래가 평균과 실거래 내역 수와 함께<br/>
        지역 내 주요 시설 정보와 뉴스 등의 소식도 볼 수 있어요<br/>
        지도를 통해 더 자세히 내가 살고 싶은 그곳의 모든 것을 확인해보세요
        </span>
      </div>

    </div>

    <div class="info-container right">
      <img src="@/assets/imgs/info/info2.png">
      <div>
        <h2>내가 궁금한 그 아파트에 대한 모든 것</h2>

        <span>여기는 얼마에 거래될까?<br/>
        당신이 궁금해했던 그 아파트의 실거래 보고서를 받아보세요<br/>
        근처 주요시설부터 HOME:IN 점수까지<br/>
        당신만의 집에 들어서기까지, HOME:IN이 함께해요
        </span>
      </div>
    </div>

    <div class="info-container left">
      <img src="@/assets/imgs/info/info3.png">
      <div>
        <h2>오늘의 부동산 소식도 함께</h2>

        <span>빠른 정보 습득으로 내집마련의 꿈에 다가가보세요<br/>
        최신 부동산관련 소식들을 HOME:IN에서 바로 확인할 수 있어요<br/>
        원하는 토픽을 검색해 원하는 정보만 더 찾을 수 있답니다</span>
      </div>
    </div>

    <div class="right side-component">
      <input class="rainbow" type="color" name="color" :value="color" @change="setColor">
      <div>
        <h2>사이트마저도, 당신만의 색상으로</h2>

        <span>나만의 집을 찾을 때까지<br/>
        나에게 가장 편한 색상으로 더욱 편하고 즐겁게 HOME:IN을 이용해보세요<br/>
        밝은 색상도, 어두운 색상도 사용할 수 있게 라이트, 다크모드도 지원해요</span>
      </div>
    </div>

  </main>
</template>

<script>
import building2 from "@/assets/imgs/building2.js";
import building from "@/assets/imgs/building.js";
import TopNavClear from "@/components/common/TopNavClear.vue";
export default {
  components: { TopNavClear },
  name: "HomeView",
  data() {
    return {
      background: {
        front: building,
        back: building2,
      },
      color: "#1c256f",
    };
  },
  methods: {
    setColor($event) {
        this.color = $event.target.value;
        
        let {r, g, b} = this.hexToRgb();
        let grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
        console.log(grayscale);
        if(grayscale > 190) {
          document.documentElement.style.setProperty("--white", "#000");
          document.documentElement.style.setProperty("--black", "#fff");
        }
        document.documentElement.style.setProperty("--navy", $event.target.value);
    },
    hexToRgb() {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    setZindex($event) {
      // console.log($event.currentTarget.scrollY);
      if($event.currentTarget.scrollY>500) this.$refs.main.style.zIndex = 1;
      else this.$refs.main.style.zIndex = 10000;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.setZindex);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setZindex);
  }
};
</script>

<style scoped>
@keyframes displace {
  from { margin-left: 100%;}
  to { margin-left: 0}
}
@keyframes displace-pre {
  from { margin-left: 0}
  to { margin-left: -100%}
}
@keyframes displace-next {
  from { margin-left: 200%}
  to { margin-left: 100%}
}
.home {
  z-index: 10000;
  position: relative;
  margin-top: -80px;
  height: 200vh;
}
.home::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
.background {
  width: 100%;
  height: 580px;
  background-color: var(--navy);
  position: relative;
  overflow: hidden;
}
.background .title {
  z-index: 50;
  width: 100%;
  height: 580px;
  position: absolute;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.background .title span {
font-size: 18px;
}
.background .title h1 {
  font-size: 75px;
  font-weight: 900;
  margin: 0;
}
.back-building {
  z-index: 1;
  width: 100%;
  height: 700px;
  position: absolute;
  animation: displace 97s linear infinite;
}
.front-building {
  z-index: 1000;
  width: 100%;
  height: 850px;
  position: absolute;
  animation: displace 23s linear infinite;
}
.pre{
  animation-name: displace-pre;
}
.next{
  animation-name: displace-next;
}

.info-container {
  margin: auto;
  margin-top: 20px;
  width: 100%;
  max-width: 1080px;
  padding: 20px;
  display: flex;
}
.info-container img {
  width: 50%;
  box-shadow: 2px 5px 15px var(--shadow);
}
.info-container > div {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-container > div > h2 {
  color: var(--navy);
  font-weight: 900;
}
.info-container > div > span {
  line-height: 30px;
  font-size: 16px;
}
.side-component {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--navy);
  margin-top: 30px;
  padding: 20px 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
}

.right {
  flex-direction: row-reverse;
  text-align: right;
  position: relative;
}
.rainbow {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 40px;
  top: 30px;
}
.rainbow::after {
  content: "Click Me!";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  color: var(--white);
}
</style>
