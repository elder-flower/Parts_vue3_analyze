<template>
  <teleport to="body">
    <transition name="modal_fade">
      <div
        id="modal"
        v-bind:class="[{ modalshow: isModal2 }]"
        v-show="isModal2"
      >
        <div id="modal_inner" v-on:click="onModalClose">
          <div id="t_margin"></div>
          <div id="dialog" v-on:click.stop="onStopClick">
            <slot name="contents"></slot>
          </div>
          <div id="b_margin"></div>
        </div>
        <button
          id="modal_close"
          v-on:click="onModalClose"
          v-if="isBtn2"
        ></button>
        <div id="modal_loading"><div></div></div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, watchEffect } from 'vue';
export default {
  name: 'Modal',
  props: ['isModal', 'isBtn'],
  emits: ['modalClose'],
  setup(props, context) {
    // モーダルの表示非表示を管理する変数。
    const isModal2 = ref(props.isModal);

    // 右上に表示される」「閉じるボタン」の表示非表示を管理する変数。
    const isBtn2 = props.isBtn;

    watchEffect(() => {
      isModal2.value = props.isModal;
    });

    //「閉じるボタン」等が押された時に親へ「emit」を送る関数。
    const onModalClose = () => {
      console.log('onModalClose2');
      context.emit('modalClose', false);
      isModal2.value = false;
    };

    // コンテンツ部分をクリックした時にイベントを伝播させないようにする。
    // 「Event.stopPropagation()」=「v-on:click.stop」
    const onStopClick = () => {};

    return { isModal2, onModalClose, onStopClick, isBtn2 };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/reset_btn.scss';
@import '../assets/style/modal_layout.scss';
@import '../assets/style/modal_behavior.scss';
@import '../assets/style/modal_style.scss';
@import '../assets/style/modal.scss';
@import '../assets/style/modal_close.scss';
@import '../assets/style/modal_animation.scss';
</style>
