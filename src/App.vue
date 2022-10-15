<template>
  <div>
    <form>
      <label for="dog">いぬ</label>
      <input type="radio" id="dog" value="いぬ" v-model="pet" />
      <br />
      <label for="cat">ねこ</label>
      <input type="radio" id="cat" value="ねこ" v-model="pet" />
      <br />
      <label for="other">その他</label>
      <input type="radio" id="other" value="その他" v-model="pet" />
    </form>
    <p>ペット：{{ pet }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const pet = ref('いぬ');

    return { pet };
  },
};
</script>

<style scoped>
div {
  margin: 50px auto;
  width: 50%;
}
input {
  margin: 1em 0;
}
</style>
