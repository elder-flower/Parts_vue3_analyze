<template>
  <div id="wrapper">
    <table class="table">
      <th>ISBN</th>
      <th>書名</th>
      <th>価格</th>
      <tr v-for="b in expensiveBooks" v-bind:key="b.isbn">
        <!-- <tr v-for="b in books" v-if="b.price >= 2500"> -->
        <td>{{ b.isbn }}</td>
        <td>{{ b.title }}</td>
        <td>{{ b.price }}円</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const books = ref([
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

    const expensiveBooks = computed(() => {
      return books.value.filter((b) => b.price >= 2500);
    });

    return { books, expensiveBooks };
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
