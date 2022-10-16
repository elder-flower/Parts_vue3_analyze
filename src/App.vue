<template>
  <div id="wrapper">
    <form>
      <label for="mail">メールアドレス：</label>
      <textarea id="mail" v-model="mails"></textarea>
    </form>
    <ul>
      <li v-for="mail in mails2">
        {{ mail }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const mails = ref('');
    const mails2 = computed(() => {
      const mails_arr = mails.value.split(';');
      return mails_arr;
    });
    return { mails, mails2 };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
input {
  margin: 1em 1em 1em 1em;
}
</style>
