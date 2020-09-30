import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";

const render = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require("./App").default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();

// NOTE 핫 리로딩을 위한 코드 주입입니다.
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
