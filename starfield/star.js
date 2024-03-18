export class Star {
  constructor() {
    const el = document.createElement('div');
    el.classList.add('star');

    this.star = el;

    this.render();
  }

  render() {
    return this.star;
  }
}
