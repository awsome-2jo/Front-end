<template>
  <div class="place-nav">
    <toggle-button text="마트" @event="togglePlace(`MT1`)" :value="options.MT1" />
    <toggle-button text="편의점" @event="togglePlace(`CS2`)" :value="options.CS2" />
    <toggle-button text="학교" @event="togglePlace(`SC4`)" :value="options.SC4" />
    <toggle-button text="지하철역" @event="togglePlace(`SW8`)" :value="options.SW8" />
    <toggle-button text="문화시설" @event="togglePlace(`CT1`)" :value="options.CT1" />
    <toggle-button text="카페" @event="togglePlace(`CE7`)" :value="options.CE7" />
    <toggle-button text="병원" @event="togglePlace(`HP8`)" :value="options.HP8" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// const placeArr = {
//   MT1: { name: "대형마트", icon: MartIcon },
//   CS2: { name: "편의점", icon: StoreIcon },
//   SC4: { name: "학교", icon: SchoolIcon },
//   SW8: { name: "지하철역", icon: SubwayIcon },
//   CT1: { name: "문화시설", icon: CultureIcon },
//   CE7: { name: "카페", icon: CafeIcon },
//   HP8: { name: "병원", icon: HospitalIcon },
// };
import ToggleButton from "../common/ToggleButton.vue";
export default {
  components: { ToggleButton },
  name: "PlaceNav",
  data() {
    return {
      options: {
        MT1: false,
        CS2: false,
        SC4: false,
        SW8: false,
        CT1: false,
        CE7: false,
        HP8: false,
      },
    };
  },
  computed: {
    ...mapState("AptStore", ["place"]),
  },
  methods: {
    ...mapActions("AptStore", ["setPlace"]),
    togglePlace(option) {
      this.options[option] = !this.options[option];
      this.setPlace({ ...this.options });
    },
  },
};
</script>

<style scoped>
.place-nav {
  position: absolute;
  height: 60px;
  width: 100%;
  z-index: 1;
}
.place-nav::before {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: var(--navy);
  opacity: 0.2;
}
</style>
