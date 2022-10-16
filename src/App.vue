<template>
  <div id="wrapper">
    <form>
      <label for="show">表示／非表示</label>
      <input type="checkbox" id="show" v-model="show" />
    </form>
    <div id="panel" v-if="show">
      <!-- <div id="panel" v-show="show"> -->
      <h3>RSSフィードについて</h3>
      <div>
        WINGSでは、弊社執筆の書籍／雑誌／Web記事の最新50件をRSS形式で提供しています。<br />
        RSSとはなにか、その使い方を含め、ご案内します。
      </div>
    </div>
    <!-- <div v-else>現在、非表示状態です。</div> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const show = ref(true);

    return { show };
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
