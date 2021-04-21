import React from "react";
import { connect } from "react-redux";
import { STOP_TRACK } from "../store/actions";
import BeatContainer from "./Beats/BeatContainer";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

const BeatMaker = ({ samples, onStopAll }) => {
  return (
    //<DeviceOrientation lockOrientation={"portrait"}>
    //<Orientation orientation="portrait" alwaysRender={false}>

    <div
      className="sound-container"
      style={{ height: `${window.innerHeight}px` }}
    >
      <h1>
        MOTIV <span>BEAT</span>MAKER
      </h1>
      <div className="beats-wrapper">
        {samples.map((item) => (
          <BeatContainer soundName={item.id} key={item.id} />
        ))}
      </div>

      <div className="controls">
        {/*<img src={svg} alt="" />*/}
        <button className="close" onClick={() => alert("Хоба! Нэ работаэт")}>
          Close
        </button>
        <button className="stop" onClick={onStopAll}>
          Stop All
        </button>
      </div>
    </div>
    // </Orientation>
    // <Orientation orientation="landscape" alwaysRender={false}>
    //   <div className="popup-rotate">
    //     <p>Please rotate your device</p>
    //   </div>
    // </Orientation>
    // </DeviceOrientation>
  );
};

const mapStateToProps = ({ samples }) => ({ samples });
const mapDispatchToProps = (dispatch) => ({
  onStopAll: () => dispatch({ type: STOP_TRACK }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeatMaker);
