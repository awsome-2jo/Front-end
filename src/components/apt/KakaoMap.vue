<template>
  <div id="map"></div>
</template>

<script>
import { mapState } from "vuex";

// 카카오 마커 이미지, 곧 수정할 예정
const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      geocoder: null,
      imageSize: null,
      markerImage: null,
      ...mapState(["sido", "gugun", "dong", "regcode"]),
    };
  },
  methods: {
    // 지도 삽입 메서드
    initMap() {
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 10, //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(this.$el, options);
      this.geocoder = new kakao.maps.services.Geocoder();
      let imageSize = new kakao.maps.Size(24, 35);
      this.markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      this.setLocation();
    },

    // 지도 이동 메서드
    setLocation() {
      var callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.map.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
          this.map.setLevel(3);
        }
      };
      let address = [this.sido(), this.gugun(), this.dong()].filter((val) => val).join(" ");
      this.geocoder.addressSearch(address ? address : "서울특별시", callback);
    },
  },

  computed: {
    getRegcode() {
      return this.regcode();
    },
  },
  watch: {
    getRegcode() {
      this.setLocation();
    },
  },
  mounted() {
    // Kakao map API 등록하기
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services`;
    document.head.appendChild(script);

    /* global kakao */
    script.addEventListener("load", () => {
      kakao.maps.load(this.initMap);
    });
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh - 140px);
  position: absolute;
}
</style>
