import AbstractView from "./abstract.js";

export default class LoadingView extends AbstractView {
  _getTemplate() {
    return (
      `<p class="board__no-tasks">
        Loading...
      </p>`
    );
  }
}
