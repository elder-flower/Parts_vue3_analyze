<template>
  <main></main>
  <ModaL v-bind:is-modal="isModal"></ModaL>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import ModaL from './components/Modal.vue';

//https://www.google.com/search?q=firefox+webkit-inner-spin-button&lr=lang_ja&sa=X&ved=2ahUKEwjQjdT3_fX6AhX1gVYBHS-pAs4QuAF6BAgIEAE&biw=938&bih=793&dpr=2

// https://qiita.com/mrpero/items/c562cf9c2493bbbfe431

export default {
  name: 'App',
  components: { ModaL },

  setup() {
    const isModal = ref(false);
    return { isModal };
  },
};
</script>

<style scoped>
#wrapper {
}
</style>
