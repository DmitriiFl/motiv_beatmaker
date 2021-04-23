import React from "react";
import "../styles/App.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import BeatMaker from "./beatMaker/BeatMaker";
import { reducer } from "../store/reducer";
import UseMobile from "./useMobile/UseMobile";

const App = () => {
  const store = createStore(reducer);

  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  return detectMob() ? (
    <Provider store={store}>
      <BeatMaker />
    </Provider>
  ) : (
    <UseMobile />
  );
};

export default App;
