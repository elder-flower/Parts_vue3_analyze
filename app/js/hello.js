const app = Vue.createApp({
  data: function() {
    return {
      message: '皆さん、こんにちは！',
      message2: '皆さん、こんにちは2！'
    };
  },
});

app.mount('#app');

console.log('app');
console.log(app);

// console.log('app.mount(#app)');
// console.log(app.mount('#app'));

// console.log(app.config)