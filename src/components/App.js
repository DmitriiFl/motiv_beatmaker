import React, { useState } from "react";
import "../styles/App.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import BeatMaker from "./BeatMaker";
import { reducer } from "../store/reducer";

const App = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <BeatMaker />
    </Provider>
  );
};

export default App;
