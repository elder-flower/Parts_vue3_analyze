<template>
  <div id="wrapper">
    <form>
      <label for="name">氏名：</label>
      <input type="text" id="name" v-on:keyup.escape="onclear" v-model="name" />
      <!-- <input type="text" id="name" v-on:keyup.esc="onclear" v-model="name"/> -->
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
div {
  padding: 1em;
  margin: 1em;
}
#parent {
  background: #000;
}
#my {
  background: #411;
}
#child {
  background: #141;
}
</style>
