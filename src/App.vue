<template>
  <div id="wrapper">
    <form>
      <input ref="upfile" type="file" v-on:change="onchange" />
    </form>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const message = ref('');
    const upfile = ref('');

    const onchange = () => {
      const fl = upfile.value.files[0];
      console.log(fl);
      const data = new FormData();
      console.log(data);

      data.append('upfile', fl, fl.name);

      const path = 'http://www.elder-flower.com/111/upload.php';
      fetch(path, {
        method: 'POST',
        body: data,
      })
        .then((response) => response.text())
        .then((text) => {
          message = text;
        })
        .catch((error) => {
          window.alert(`Error: ${error.message}`);
        });
    };
    return { upfile, message, onchange };
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
