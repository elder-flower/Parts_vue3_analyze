<template>
  <div id="modal" v-show="isModal2">
    <div id="modal_inner">
      <div id="dialog">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
export default {
  name: 'Modal',
  props: ['isModal'],
  //emits: ['nextPos'],
  setup(props, context) {
    const isModal2 = ref(props.isModal);
    console.log(isModal2.value);
    return { isModal2 };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/modal.scss';
</style>
