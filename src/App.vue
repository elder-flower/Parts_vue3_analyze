<template>
  <div id="wrapper">
    <ul>
      <li v-for="[key, value] in map" v-bind:key="key">
        {{ key }}：{{ value }}
      </li>

      <!-- キーだけを列挙 -->
      <!-- <li v-for="[key] in map">
        {{key}}
      </li> -->

      <!-- 値だけを列挙 -->
      <!-- <li v-for="[, value] in map">
        {{value}}
      </li> -->

      <!-- 「v-for="key in map"」とした場合 -->
      <!-- <li v-for="key in map">
        {{key}}
      </li> -->
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    const map_obj = new Map([
      ['PHP', 'PHP: Hypertext Preprocessor'],
      ['JSP', 'Jakarta Server Pages'],
      ['ASP', 'Active Server Pages'],
    ]);
    console.log(map_obj.get('PHP'));
    //const map = ref(map_obj);
    const map = reactive(map_obj);

    return { map };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
th,
td {
  padding: 1em 1em 1em 1em;
}
</style>
