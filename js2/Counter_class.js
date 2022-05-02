/**
 * 変更履歴。
 * 001 「終了後に実行する関数」を追加する機能を追加。
 * 002 「progress要素」にも対応。
 */
/**
 * 受け取った要素の中にある文字列の数字をカウントする関数。
 * @param elem, duration, count-down用の数値
 */
export class Counter_Class {
  constructor({
    elem,
    duration,
    countdown,
    endFunc,
    easing,
    win,
    progressElem,
    progressDiv,
  }) {
    this.num = 0;
    this.startTime = 0;
    this.elem = elem;
    this.duration = duration != null ? duration : 1000;
    this.countDown = countdown;
    this.easing = easing != null ? easing : this.linear;
    this.win = win;
    this.animationId;
    this.endFunc = endFunc;
    this.progressElem = progressElem;
    this.progressDiv = progressDiv;
  }
  /**
   * アニメーションのイージング関数です
   * @param x
   * @returns {number}
   */
  linear(x) {
    return x * 1;
  }
  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }
  counter() {
    const num = this.elem.innerHTML * 1;
    this.num = num;
    this.startTime = performance.now();
    this.count(this.startTime);
  }
  count(time) {
    const progress = (time - this.startTime) / this.duration;
    if (progress < 1) {
      let num2;
      if (this.countDown === undefined) {
        num2 = this.num * this.easing(progress);
      } else {
        const end = (this.countDown - this.num) * this.easing(progress);
        num2 = this.countDown - end;
      }

      let num2_ = Math.round(num2);

      if (this.progressElem !== undefined) {
        this.progressElem.value = num2_;
        this.progressElem.innerHTML = num2_;
      } else {
        if (this.progressDiv !== undefined) {
          this.progressDiv.style.transformOrigin = 'left center';
          this.progressDiv.style.transform = `translate(-50%, -50%) scale(${num2_}%, 100%)`;
        }
      }

      this.elem.innerHTML = num2_;
      this.animationId = this.win.requestAnimationFrame(this.count.bind(this));
    } else {
      this.elem.innerHTML = this.num * 1;
      if (this.endFunc !== undefined) {
        this.endFunc();
      }
    }
  }
  cancelCount() {
    this.win.cancelAnimationFrame(this.animationId);
  }
}
