<template>
  <div>
    <button v-on:click="onclick">クリック</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup() {
    onclick = (e) => {
      console.log(e);
    };

    return { onclick };
  },
};
</script>

<style scoped>
div {
  margin: 30px;
  text-align: center;
}
</style>
