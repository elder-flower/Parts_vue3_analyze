/*
const app = Vue.createApp({
  data: function() {
    return {
      message: '皆さん、こんにちは！'
    };
  }
});

app.mount('#app');
*/

// const re = Vue.h('div');
// const re = Vue.h('div', { id: 'foo' });
// const re = Vue.h('div', { class: 'bar', innerHTML: 'hello' })
// const re = Vue.h('div', { onClick: () => {} });

const re = Vue.h('div', ['hello', Vue.h('span', 'hello')])

console.log('re');
console.log(re);

// console.log('app');
// console.log(app);

// console.log(app.config)