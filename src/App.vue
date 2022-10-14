<template>
  <div>
    <form>
      <input type="button" value="クリック" v-on:click="onclick" />
    </form>
    <div>算出プロパティ：{{ randomc }}</div>
    <div>メソッド：{{ randomm() }}</div>
    <div>現在日時：{{ current }}</div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    let current = ref(new Date().toLocaleString());
    //let current = new Date().toLocaleString();

    const randomc = computed(() => {
      return Math.random();
    });

    const onclick = () => {
      current.value = new Date().toLocaleString();
    };

    const randomm = () => {
      return Math.random();
    };

    return { current, randomc, onclick, randomm };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
  text-align: center;
}
</style>
