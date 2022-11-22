<template>
  <div id="map"></div>
</template>

<script>
import { getAptList } from "@/api/apt";
import { mapActions, mapState } from "vuex";

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
      markers: {
        apt: [],
      },
      data: {
        apt: [],
      },
    };
  },
  methods: {
    ...mapActions("AptStore", ["setMap"]),
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
      kakao.maps.event.addListener(this.map, "dragend", this.setCenter);
    },
    // 지도 이동 메서드
    setLocation() {
      var callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.map.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
          this.map.setLevel(3);
        }
      };
      let address = [this.sido, this.gugun, this.dong].filter((val) => val).join(" ");
      this.geocoder.addressSearch(address ? address : "서울특별시", callback);
    },
    // 중심좌표 변경 메서드
    setCenter() {
      let center = this.map.getCenter();
      let callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let level = this.map.getLevel();
          let regcode = result[0].code;
          console.log(level);
          // 확대 크기(level)에 따라 지역코드 길이 조절
          if (level > 11) regcode = "";
          else if (level > 8) regcode = regcode.slice(0, 2);
          else if (level > 5) regcode = regcode.slice(0, 5);
          else if (level > 3) regcode = regcode.slice(0, 7);
          console.log(regcode);
          this.getAptMarkers(regcode);
        }
      };
      this.geocoder.coord2RegionCode(center.getLng(), center.getLat(), callback);
    },
    // 아파트 마커 표시 메서드
    getAptMarkers(regcode) {
      let params = { regcode: regcode, amount: 50 };
      const resolve = (res) => {
        console.log(res.data.length);
        this.data.apt = res.data;
      };
      const reject = (err) => console.log(err);
      getAptList(params, resolve, reject).then(this.drawMarkers);
    },
    // 아파트 정보 표시 메서드
    drawMarkers() {
      for (let marker of this.markers.apt) {
        marker.setMap(null);
      }

      let aptMarkers = [];

      for (let apt of this.data.apt) {
        var latlng = new kakao.maps.LatLng(apt.lat, apt.lng);
        aptMarkers.push(
          new kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: latlng,
            title: apt.apartmentName,
            image: this.markerImage, // 마커 이미지
          })
        );
      }

      this.markers.apt = aptMarkers;
    },
  },

  computed: {
    ...mapState("AptStore", ["mapDiv", "sido", "gugun", "dong", "regcode"]),
  },
  watch: {
    regcode() {
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

<style>
#map {
  width: 100%;
  height: calc(100vh - 140px);
  position: absolute;
}
</style>
