<template>
  <div>
    <button v-on:click="onclick">クリック</button>
    <!-- <button v-on:click="message= new Date().toLocaleString()">クリック</button> -->
    <!-- <button v-on:click="onclick()">クリック</button> -->
    <!-- <button @click="onclick">クリック</button> -->
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup(props, context) {
    let message = ref('');

    const onclick = () => {
      message.value = new Date().toLocaleString();
    };

    return { message, onclick };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
