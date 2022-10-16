<template>
  <div id="wrapper">
    <div
      id="main"
      v-on:click.left="onleftclick"
      v-on:click.right.prevent="onrightclick"
    >
      <!-- <div id="main"
    v-on:click.left="onleftclick"
    v-on:click.ctrl.exact.right.prevent="onrightclick"> -->
      ボタンの右クリックでコンテキストメニューを表示します。
    </div>
    <ul class="cxt" v-bind:style="pos" v-show="show">
      <li><a href="https://wings.msn.to/index.php/-/A-08/">ヘルプ</a></li>
      <li><a href="https://wings.msn.to/index.php/-/B-14/">質問掲示板</a></li>
      <li>
        <a href="https://wings.msn.to/index.php/-/B-11/">よくある質問一覧</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const pos = ref({
      left: 0,
      top: 0,
    });
    const show = ref(false);

    const onleftclick = () => {
      show.value = false;
    };
    const onrightclick = (e) => {
      pos.value = {
        top: e.pageY + 'px',
        left: e.pageX + 'px',
      };

      show.value = true;
    };

    return { pos, show, onleftclick, onrightclick };
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
