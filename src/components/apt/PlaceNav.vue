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
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.place-nav > div {
  margin: 5px;
  border: 2px solid var(--shadow);
}
.place-nav::before {
  content: "";
  height: 100%;
  width: calc(100% + 10px);
  left: -10px;
  position: absolute;
  background-color: var(--navy);
  opacity: 0.2;
}
</style>
