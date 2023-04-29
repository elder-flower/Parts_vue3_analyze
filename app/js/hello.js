Vue.createApp({
  data: function() {
    return {
      message: '皆さん、こんにちは！'
    };
  }
}).mount('#app');

console.log('Vue.createApp({}))');
console.log(Vue.createApp({
  data: function() {
    return {
      message: '皆さん、こんにちは！'
    };
  }
}));