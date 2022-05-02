import { Counter_Class } from './Counter_class.js';

const doc = document;
const win = window;

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
function appear() {
  const progress_set = doc.querySelector('#progress_set');
  const loader_coverUp = doc.querySelector('.loader_cover-up');
  const loader_coverDown = doc.querySelector('.loader_cover-down');

  loader_coverUp.classList.add('coveranime');
  loader_coverDown.classList.add('coveranime');
  progress_set.classList.add('fadeOut');
}
function Init() {
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

win.addEventListener('DOMContentLoaded', Init, {
  once: true,
  passive: true,
  capture: false,
});
