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

  <!-- NOTE:
  使い方。
  ・<template v-slot:contents>以下にコンテンツを配置する。
    モーダルコンテンツ内で「閉じるボタン」を使用する場合は以下を設定する。

    v-on:click="onModalClose(false)"

  -->
  <ModaL
    v-bind:is-modal="isModal"
    v-bind:is-btn="isTopRightBtn"
    v-on:modal-close="onModalClose"
  >
    <template v-slot:contents>
      <section class="bg">
        <h2>お知らせ1</h2>
        <p>
          おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。おしらせの内容が入ります。
        </p>
        <button class="close_btn" v-on:click="onModalClose(false)">
          close btn
        </button>
      </section>
    </template>
  </ModaL>
</template>

<script>
import { ref, reactive, computed, onBeforeUpdate } from 'vue';
import ModaL from './components/Modal.vue';

export default {
  name: 'App',
  components: { ModaL },

  setup() {
    // モーダルの表示非表示を管理する変数。
    const isModal = ref(false);

    //「true」の場合はモーダルコンテンツ内の右上のボタンの表示をする。
    const isTopRightBtn = true;

    // クリックした時にモーダルを表示させる関数。
    const onMmodalShow = () => {
      console.log('onMmodalShow');
      isModal.value = true;
    };

    // クリックした時にモーダルを閉じる関数。
    const onModalClose = () => {
      console.log('onModalClose1');
      isModal.value = false;
    };

    // モーダルを表示させた時に縦のスクロールバーを表示させない為の処理をする。
    onBeforeUpdate(() => {
      //html要素に「overflow-y:hidden」を付ける。
      const html = document.documentElement;

      if (isModal.value) {
        html.setAttribute('style', 'overflow-y: hidden;');
      } else {
        html.removeAttribute('style');
      }
    });

    return { isModal, onMmodalShow, onModalClose, isTopRightBtn };
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
