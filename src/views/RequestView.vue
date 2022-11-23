<template>
  <main></main>
</template>

<script>
import { userConfirm } from "@/api/user";
export default {
  created() {
    console.log(this.$route.params.data);
    const resolve = () => {
      alert("인증되었습니다!")
      this.$router.push("/");
    }
    const reject = () => {
      alert("인증에 실패하였습니다!");
      this.$router.push("/");
    }
    userConfirm(this.$route.params.data, resolve, reject);
  }
}
</script>

<style>

</style>