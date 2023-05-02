
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

|||  L 6012

mount, render 処理の流れ。

app.mount = (containerOrSelector) => {
    const proxy = mount(container, false, container instanceof SVGElement);
    return proxy
}

mount(rootContainer, isHydrate, isSVG) {} ==> const render = (vnode, container, isSVG) => {} ==> patch();

==> switch (type) {} で表示処理される。

processElement();
processComponent();


| L 12417 以下から呼び出されている。

const proxy = mount(container, false, container instanceof SVGElement);


|||  L 6979 const processElement = () => {}

processElement() => mountElement(); => hostInsert(); hostInsert = nodeOps.insert();
                 => patchElement();

processComponent() => mountComponent(); => setupRenderEffect();

|||  L 7700 setupRenderEffect = ();



|||  L 7026 mountElement();

|||  L 7206 patchElement();

|||  L 7556 processComponent();

|||  L hostInsert();

|||  L 6756 patch

const patch = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = isHmrUpdating ? false : !!n2.dynamicChildren
  ) => {}


|||  L 9009

  const Fragment = Symbol('Fragment');
  const Text = Symbol('Text');
  const Comment = Symbol('Comment');
  const Static = Symbol('Static');


|||  L 8494 const render = (vnode, container, isSVG) => {}


|||  L 10313

getExposeProxy



|||  L 8651

const mount = (container, anchor) => {}


||| L 12323

app.mount = (containerOrSelector) => {
    const proxy = mount(container, false, container instanceof SVGElement);
    return proxy
}



||| L 6958

const mountElement = (){}

||| L 10747

const nodeOps = {}

||| L 12335

const rendererOptions = extend({ patchProp }, nodeOps);

||| L 12348

function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }


||| L 12498 normalizeContainer

文字列の場合は文字列の要素を取得して返す。
const res = document.querySelector(container)
return res;

L 12388
const container = normalizeContainer(containerOrSelector);

||| L 17868

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

||| L 9061

function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}


| VNode

{
data: f(),
render: f(),
template: "\n      <p><span>{{ message }}</span></p>\n    "
}



||| L 5905 function createAppAPI(render, hydrate) {}

console.log(app); で出力されるObjectのテンプレート部分がある。

||| L 11805 Composition API: setup() の変換関数？

const TransitionGroupImpl 


||| L 1434 isReactive

function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value['__v_raw' /* RAW */]);
  }
  return !!(value && value['__v_isReactive' /* IS_REACTIVE */]);
}

||| L 1440 isReadonly

function isReadonly(value) {
  return !!(value && value['__v_isReadonly' /* IS_READONLY */]);
}

||| L 1443 isShallow

function isShallow(value) {
  return !!(value && value['__v_isShallow' /* IS_SHALLOW */]);
}

||| L 1446 isProxy

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}