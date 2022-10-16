<template>
  <div id="wrapper">
    <form method="POST" v-on:submit="onsubmit">
      <label for="email">メールアドレス：</label>
      <input id="email" name="email" type="email" />
      <input type="submit" value="送信" />
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const onsubmit = (e) => {
      if (!confirm('送信しても良いですか？')) {
        e.preventDefault();
        return;
      }
    };

    return { onsubmit };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
.cxt {
  position: absolute;
  z-index: 99;
  padding: 0px;
  border-width: 1px;
  border-style: solid;
  background-color: #e8e8e8;
}

.cxt li {
  padding: 5px 15px 5px 15px;
  list-style: none;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  border-bottom-style: dotted;
  color: #000;
  cursor: pointer;
}

.cxt a {
  color: #000;
  text-decoration: none;
}

.cxt li.sep {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}

#main {
  position: relative;
  border: solid 1px #000;
  height: 300px;
  width: 400px;
}
</style>
