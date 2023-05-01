
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

=> createVNode(type, propsOrChildren, children);

||| L 9173

const createVNode = createVNodeWithArgsTransform;

||| L 9083

const createVNodeWithArgsTransform = (...args) => {}

||| L 9181

createVNodeWithArgsTransform から呼ばれる。

function _createVNode(
    type,
    props = null,
    children = null,
    patchFlag = 0,
    dynamicProps = null,
    isBlockNode = false
){}


||| L 9106

function createBaseVNode(
    type,
    props = null,
    children = null,
    patchFlag = 0,
    dynamicProps = null,
    shapeFlag = type === Fragment ? 0 : 1 /* ELEMENT */,
    isBlockNode = false,
    needFullChildrenNormalization = false
  ) {}

_createVNode から呼ばれる。

| L 9116
 
const vnode

| VNode

type:
children : 入れ子で文字列や子要素が入る。

{
data: f(),
render: f(),
template: "\n      <p><span>{{ message }}</span></p>\n    "
}

or 

type : 'div'

||| L 9061

function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}



||| L11805 Composition API: setup() の変換関数？

const TransitionGroupImpl 