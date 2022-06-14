import { Counter_Class } from './Counter_class.js';

const doc = document;
const win = window;

function Counter_Set() {
  Counter_Init();

  // カウント初期化、実行する関数。
  function Counter_Init() {
    const elem = doc.querySelector('#splash_text span');
    const progress_elem = doc.querySelector('#loading_progress');
    const progress_bar = doc.querySelector('#progress_bar');
    const Counter = new Counter_Class({
      elem: elem,
      duration: 1000,
      endFunc: appear,
      easing: easeOutQuad,
      progressElem: progress_elem,
      //progressDiv: progress_bar,
      win: win,
    });
    Counter.counter();
  }
  // カウント終了後に実行する関数。
  function appear() {
    const progress_set = doc.querySelector('#progress_set');
    const loader_coverUp = doc.querySelector('.loader_cover-up');
    const loader_coverDown = doc.querySelector('.loader_cover-down');
    loader_coverDown.addEventListener(
      'transitionend',
      () => {
        progress_set.setAttribute('style', 'display:none;');
      },
      {
        passive: true,
      }
    );
    loader_coverUp.classList.add('coveranime');
    loader_coverDown.classList.add('coveranime');
    progress_set.classList.add('fadeOut');
  }
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }
}
function Init() {
  Counter_Set();
}

win.addEventListener('DOMContentLoaded', Init, {
  once: true,
  passive: true,
  capture: false,
});
