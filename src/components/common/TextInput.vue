<template>
  <div class="text-input-compont">
    <font-awesome-icon v-if="icon === `search`" icon="fa-solid fa-magnifying-glass" class="awsome-icon" />
    <font-awesome-icon v-else-if="icon === `user`" icon="fa-solid fa-user" class="awsome-icon" />
    <font-awesome-icon v-else-if="icon === `password`" icon="fa-solid fa-key" class="awsome-icon" />
    <input :type="type" :value="value" @input="onChange" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "입력해주세요",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    onChange() {
      this.$emit("on-change", event.target.value);
    },
  },
};
</script>

<style scoped>
.awsome-icon {
  color: var(--white);
  font-size: 20px;
  width: 45px;
}
.text-input-compont {
  background-color: var(--navy);
  height: 40px;
  width: 300px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.text-input-compont > input {
  background: none;
  border: none;
  height: 30px;
  width: 225px;
  font-size: 16px;
  color: var(--white);
}
.text-input-compont > input:focus {
  outline: none;
}
.text-input-compont > input::placeholder {
  color: var(--white);
  font-size: 14px;
  opacity: 0.3;
}
</style>
