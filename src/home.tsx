import type { Component } from 'mithril';

const defineComponent = (com: Component) => com;

const Home = defineComponent({
  view() {
    return (
      <div class='home'>
        <h1>欢迎使用 Mithril + TSX + rspack!</h1>
      </div>
    );
  }
});

export default Home;
