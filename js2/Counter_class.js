/**
 * 変更履歴。
 * 001 「終了後に実行する関数」を追加する機能を追加。
 * 002 「progress要素」にも対応。
 * 003 スクロール中に関数が再発動する事があり、到達点の数字が変わってしまうことがあるので「counter2()」を追加。
 * 004 プログレスバーのみ繰り返し動かすメソッドを追加。
 * 005 desktop Safariの不具合対応。
 */
/**
 * 受け取った要素の中にある文字列の数字をカウントする関数。
 * @param elem, duration, count-down用の数値
 */
export class Counter_Class {
  constructor({
    elem,
    attr,
    duration,
    countdown,
    endFunc,
    easing,
    win,
    progressElem,
    progressDiv,
    progress_bar_count_repeat,
  }) {
    this.num = 0;
    this.startTime = 0;
    this.elem = elem;
    this.attr = attr != null ? attr : 'data-num';
    this.duration = duration != null ? duration : 1000;
    this.countDown = countdown;
    this.easing = easing != null ? easing : this.linear;
    this.win = win;
    this.animationId;
    this.endFunc = endFunc;
    this.progressElem = progressElem;
    this.progressDiv = progressDiv;
    this.Running = false;
    this.progress_bar_count_repeat =
      progress_bar_count_repeat != null ? progress_bar_count_repeat : false;
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
          /*
          「scaleによる伸縮」がdesktop Safariで出来ないので。
          this.progressDiv.style.transformOrigin = 'left center';
          this.progressDiv.style.transform = `translate(-50%, -50%) scale(${num2_}%, 100%)`;
          */
          const style = `transform-origin: left center; transform: translate(0%, 0%); width: ${num2_}%;`;
          this.progressDiv.setAttribute('style', style);
        }
      }
      this.elem.innerHTML = num2_;
      this.animationId = this.win.requestAnimationFrame(this.count.bind(this));
    } else {
      this.elem.innerHTML = this.num * 1;
      this.Running = false;
      if (this.endFunc !== undefined) {
        this.endFunc();
      }
    }
  }
  // 到達点の数字を受け取り、カウントアニメーションを実行する為の事前処理をする関数。
  counter_core(nm) {
    if (!this.Running) {
      this.num = nm * 1;
      this.startTime = performance.now();
      this.count(this.startTime);
      this.Running = true;
    } else {
      this.cancelCount();
    }
  }
  // 対象要素の中身の数字を使ってカウントする。
  counter() {
    const num = this.elem.innerHTML;
    this.counter_core(num);
  }
  // 要素の数字を基準にすると、意図しない関数の再発動で最終点が変わる可能性がある為、属性から数字を取得する。
  counter2() {
    const num = this.elem.getAttribute(this.attr);
    //const num = this.elem.dataset.num;
    this.counter_core(num);
  }
  // プログレスバーのみ繰り返し動かす場合
  progress_bar() {
    const nm = 100;
    if (!this.Running) {
      this.num = nm * 1;
      this.startTime = performance.now();
      this.progress_bar_count(this.startTime);
      this.Running = true;
    } else {
      this.cancelCount();
    }
  }

  // プログレスバーのみ繰り返し動かす場合の実行関数。
  progress_bar_count(time) {
    const progress = (time - this.startTime) / this.duration;
    if (progress < 1) {
      const num2 = this.num * this.easing(progress);

      let num2_ = Math.round(num2);

      /*
      「scaleによる伸縮」がdesktop Safariで出来ないので。
      this.progressDiv.style.transformOrigin = 'left center';
      this.progressDiv.style.transform = `translate(-50%, -50%) scale(${num2_}%, 100%)`;
      */

      const style = `transform-origin: left center; transform: translate(0%, 0%); width: ${num2_}%;`;
      this.progressDiv.setAttribute('style', style);

      this.animationId = this.win.requestAnimationFrame(
        this.progress_bar_count.bind(this)
      );
    } else {
      this.Running = false;
      if (this.progress_bar_count_repeat) {
        this.progressDiv.style.transform = `translate(-50%, -50%) scale(0%, 100%)`;
        this.progress_bar();
      }
      if (this.endFunc !== undefined) {
        this.endFunc();
      }
    }
  }
  cancelCount() {
    this.win.cancelAnimationFrame(this.animationId);
  }
}
