<template>
  <div id="wrapper">
    <table class="table">
      <th>No</th>
      <th>ISBN</th>
      <th>書名</th>
      <th>価格</th>
      <tr v-for="(b, i) in books">
        <td>{{ i + 1 }}</td>
        <td>{{ b.isbn }}</td>
        <td>{{ b.title }}</td>
        <td>{{ b.price }}円</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    const books = reactive([
      {
        isbn: '978-4-7981-5757-3',
        title: 'JavaScript逆引きレシピ',
        price: 2800,
      },
      {
        isbn: '978-4-8399-6644-7',
        title: 'たのしいラズパイ電子工作ブック',
        price: 1900,
      },
      {
        isbn: '978-4-7741-9763-0',
        title: '3ステップでしっかり学ぶ Python入門',
        price: 2480,
      },
      {
        isbn: '978-4-7981-5382-7',
        title: '独習C# 新版',
        price: 3600,
      },
    ]);

    return { books };
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
