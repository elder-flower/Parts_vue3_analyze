<template>
  <main>
    <section>
      <h2>Area 1</h2>

      <!--テキストを含む一般的なモーダル-->
      <ul class="info-list">
        <li>
          <button
            class="modal_link"
            data-href="#info-1"
            aria-haspopup="dialog"
            id="firstview"
            v-on:click="onMmodalShow"
          >
            お知らせを開く
          </button>
        </li>
        <li>
          <button
            class="modal_link"
            data-href="#info-2"
            aria-haspopup="dialog"
            id="firstview"
            v-on:click="onMmodalShow"
          >
            お知らせを開く
          </button>
        </li>
        <li>
          <button
            class="modal_link"
            data-href="#gallery-2"
            aria-haspopup="dialog"
            id="firstview"
            v-on:click="onMmodalShow"
          >
            画像リスト
          </button>
        </li>
      </ul>
      <!--確認を促すモーダル-->
      <p>
        <button
          class="modal_confirm"
          data-href="#login"
          aria-haspopup="dialog"
          id="firstview"
        >
          → 確認画面モーダルリンク
        </button>
      </p>
      <div id="login" class="hide-area">
        <section class="bg">
          <form
            method="get"
            action=""
            enctype="multipart/form-data"
            id="form_login"
          >
            <h2>ログイン画面</h2>
            <p>
              ログインが必要です。
              <br />この画面はボタンを押さなければ閉じません。
            </p>
            <div class="flex">
              <button
                type="button"
                id="form_login_submit"
                aria-disabled="false"
              >
                送信
              </button>
              <button
                type="button"
                id="form_login_cancel"
                aria-disabled="false"
              >
                キャンセル
              </button>
            </div>
          </form>
        </section>
      </div>

      <!--画像のモーダル-->
      <ul class="gallery-list">
        <!--data-groupに同じ名前を入れるとグループ化されて表示-->
        <li>
          <a
            href="/img/01.jpg"
            class="modal_imgs"
            data-group="gallery"
            aria-haspopup="dialog"
            data-href2="/img/01.jpg"
            ><img src="/img/01.jpg" alt="画像02" width="100"
          /></a>
        </li>
        <li>
          <a
            href="/img/02.jpg"
            class="modal_imgs"
            data-group="gallery"
            aria-haspopup="dialog"
            data-href2="/img/02.jpg"
            ><img src="/img/02.jpg" alt="画像01" width="100"
          /></a>
        </li>
        <li>
          <a
            href="/img/03.jpg"
            class="modal_imgs"
            data-group="gallery"
            aria-haspopup="dialog"
            data-href2="/img/03.jpg"
            >画像03</a
          >
        </li>
        <li>
          <a
            href="/img/04.jpg"
            class="modal_imgs"
            data-group="gallery"
            aria-haspopup="dialog"
            data-href2="/img/04.jpg"
            >画像04</a
          >
        </li>
      </ul>

      <!--動画のモーダル-->
      <p>
        <button
          class="modal_movie"
          data-href="https://www.youtube.com/embed/tiA2fWvX4XU"
          aria-haspopup="dialog"
          id="firstview"
          v-on:click="onMmodalShow"
        >
          動画を開く
        </button>
      </p>

      <!--/area1-->
    </section>
  </main>

  <ModaL v-bind:is-modal="isModal" v-on:modal-close="onClose">
    <section class="bg" v-on:click.stop="onStopClick">
      <h2>お知らせ1</h2>
      <p>
        おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。
      </p>
    </section></ModaL
  >
</template>

<script>
import { ref, reactive, computed, onBeforeUpdate } from 'vue';
import ModaL from './components/Modal.vue';

export default {
  name: 'App',
  components: { ModaL },

  setup() {
    const isModal = ref(false);

    const onMmodalShow = () => {
      console.log('onMmodalShow');
      if (isModal.value == false) {
        isModal.value = true;
      } else {
        isModal.value = false;
      }
    };

    const onClose = (flag) => {
      console.log('onClose1');
      isModal.value = flag;
    };

    // コンテンツ部分をクリックした時にイベントを伝播させないようにする。
    const onStopClick = () => {};

    onBeforeUpdate(() => {
      //html要素に「overflow-y:hidden」を付ける。
      const html = document.documentElement;
      if (isModal.value) {
        html.setAttribute('style', 'overflow-y: hidden;');
      } else {
        html.removeAttribute('style');
      }
    });

    return { isModal, onMmodalShow, onClose, onStopClick };
  },
};
</script>
<style lang="scss" scoped>
@import './assets/style/variables.scss';
@import './assets/style/reset_btn.scss';
@import './assets/style/base.scss';
@import './assets/style/modal_contents.scss';

#test1 {
  //height: 1500px;
}
</style>
