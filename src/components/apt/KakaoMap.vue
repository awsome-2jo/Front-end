<template>
  <div id="map"></div>
</template>

<script>
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
    };
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
    },

    // 지도 이동 메서드
    setLocation() {},
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
