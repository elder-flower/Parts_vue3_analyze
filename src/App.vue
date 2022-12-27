<template>
  <main>
    <section class="lists">
      <section v-for="i in lists" v-bind:key="i">list {{ i }}</section>
    </section>
    <ul class="nav_dot">
      <li v-for="j in dots" v-bind:key="j">
        <button v-bind:data-id="j" v-on:click="onDotBtn">●</button>
      </li>
    </ul>
  </main>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: { Modal },

  setup() {
    const pos = ref(2);
    const totalNumber = 50;
    const displayNumber = 15;

    let divisionNumber = Math.floor(totalNumber / displayNumber);
    const remainder = totalNumber % displayNumber;

    let dots = divisionNumber + 1;

    if (remainder !== 0) {
      dots = divisionNumber + 1;
    }

    watchEffect(() => {});

    /*
    console.log('divisionNumber');
    console.log(divisionNumber);
    console.log(remainder);
    */

    const onDotBtn = (e) => {
      if (e instanceof Event) {
        const btn = e.currentTarget;
        const btn_id = btn.dataset.id;
        console.log(btn_id);
        pos.value = Number(btn_id);
      }
    };

    const lists = pos.value * displayNumber;

    return { lists, dots, onDotBtn };
  },
};
</script>
<style lang="scss" scoped>
@import './assets/style/variables.scss';
@import './assets/style/reset_btn.scss';
@import './assets/style/base.scss';
@import './assets/style/paginationl.scss';
</style>
