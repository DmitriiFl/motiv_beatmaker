import React from "react";
import { connect } from "react-redux";
import { STOP_TRACK } from "../../store/actions";
import BeatContainer from "../Beats/BeatContainer";
import s from "./beatMaker.module.css";

const BeatMaker = ({ samples, onStopAll }) => {
  return (
    <div
      className={s.soundContainer}
      style={{ height: `${window.innerHeight}px` }}
    >
      <div className={s.popupRotateContainer}>
        <div className={s.popupRotate}>
          <p>Please, rotate your device</p>
        </div>
      </div>
      <h1>
        MOTIV <span>BEAT</span>MAKER
      </h1>
      <div className={s.beatsWrapper}>
        {samples.map((item) => (
          <BeatContainer soundName={item.id} key={item.id} />
        ))}
      </div>

      <div className={s.controls}>
        <button
          className={s.close}
          onClick={() => alert("Button reaction in progress")}
        >
          Close
        </button>
        <button className={s.stop} onClick={onStopAll}>
          Stop All
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ samples }) => ({ samples });
const mapDispatchToProps = (dispatch) => ({
  onStopAll: () => dispatch({ type: STOP_TRACK }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeatMaker);
