<template>
  <div id="modal" v-show="isModal2">
    <div id="modal_inner">test</div>
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
    return { isModal2 };
  },
};
</script>

<style lang="scss" scoped></style>
