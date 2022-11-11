<template>
  <div class="home">
    <text-input :value="text" @on-change="setText" placeholder="아파트명을 입력해주세요" />
    {{ text }}
    <toggle-button :value="bool" @event="setBool" />
    <checkbox-button :value="bool" @event="setBool" text="연습 체크박스" />
    <select-box />
  </div>
</template>

<script>
import TextInput from "@/components/common/TextInput";
import ToggleButton from "../components/common/ToggleButton.vue";
import CheckboxButton from "../components/common/CheckboxButton.vue";
import SelectBox from "../components/common/SelectBox.vue";

export default {
  components: { TextInput, ToggleButton, CheckboxButton, SelectBox },
  name: "HomeView",
  data() {
    return {
      text: "",
      bool: false,
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    },
    setBool() {
      this.bool = !this.bool;
    },
  },
};
</script>
