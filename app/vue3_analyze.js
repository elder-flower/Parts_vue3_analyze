
||||||  vue 中身分析。


||||  vue 概要

||| アプリケーション API

https://ja.vuejs.org/api/application.html

const app = Vue.createApp({})
console.log(app);

app Object の中身が上記のAPIに対応する、



|||

const app = Vue.createApp({})
app.mount('#app');

でターゲット要素の中に生成される。



||| L 12279

const createApp = (...args) => 

|||  L 5993

app.mount()



||| L17868

Vue Object の中身で見れるメソッドが書かれている。

グローバル API: 汎用
https://ja.vuejs.org/api/general.html


レンダー関数 API
https://ja.vuejs.org/api/render-function.html


カスタムレンダラー API
https://ja.vuejs.org/api/custom-renderer.html


||| L 10478 function h(type, propsOrChildren, children){}

h()
仮想 DOM ノード（vnode）を作成します。


||| L 9061

function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}


||| VNode

{
data: f(),
render: f(),
template: "\n      <p><span>{{ message }}</span></p>\n    "
}

||| L11805 Composition API: setup() の変換関数？

const TransitionGroupImpl 