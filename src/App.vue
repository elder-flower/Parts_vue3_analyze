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
          >
            画像リスト
          </button>
        </li>
        <li>
          <button
            class="modal_link"
            data-href="#info-2"
            aria-haspopup="dialog"
            id="firstview"
          >
            お知らせを開く
          </button>
        </li>
      </ul>

      <div id="info-1" class="hide-area">
        <section class="bg">
          <h2>お知らせ1</h2>
          <p>おしらせの内容が入ります。</p>
        </section>
      </div>

      <div id="info-2" class="hide-area">
        <section class="bg">
          <h2>お知らせ2</h2>
          <p>おしらせの内容が入ります。</p>
        </section>
      </div>

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
        >
          動画を開く
        </button>
      </p>

      <!--/area1-->
    </section>
  </main>
  <ModaL v-bind:is-modal="isModal"></ModaL>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import ModaL from './components/Modal.vue';

//https://www.google.com/search?q=firefox+webkit-inner-spin-button&lr=lang_ja&sa=X&ved=2ahUKEwjQjdT3_fX6AhX1gVYBHS-pAs4QuAF6BAgIEAE&biw=938&bih=793&dpr=2

// https://qiita.com/mrpero/items/c562cf9c2493bbbfe431

export default {
  name: 'App',
  components: { ModaL },

  setup() {
    const isModal = ref(false);
    return { isModal };
  },
};
</script>

<style lang="scss" scoped>
@import './assets/style/variables.scss';
@import './assets/style/reset_btn.scss';
@import './assets/style/base.scss';
</style>
