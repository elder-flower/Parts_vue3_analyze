<template>
  <div id="wrapper">
    <form>
      <label for="name">氏名：</label>

      <!--vue3では非推奨のため、使えなくなった。-->
      <input type="text" id="name" v-on:keyup.27="clear" v-model="name" />
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const name = ref('匿名');
    const onclear = () => {
      name.value = '';
    };

    return { name, onclear };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
</style>
