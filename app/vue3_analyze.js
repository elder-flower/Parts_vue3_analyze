
||||||  vue 中身分析。


||||  vue 概要

||| アプリケーション API

https://ja.vuejs.org/api/application.html



|||

Vue.createApp({}).mount('#app');
でターゲット要素の中に生成される。



||| L 12279

const createApp = (...args) => 

|||  L 5993

app.mount()

||| 
||| 
