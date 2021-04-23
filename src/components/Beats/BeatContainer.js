import React, { useState } from "react";
import BeatButton from "./BeatButton";
import useSound from "use-sound";
import { connect } from "react-redux";
import {
  ADD_STOP_FUNCTION,
  SET_FIRST_STARTED,
  STOP_TRACK,
  UPDATE_STARTED_COUNT,
} from "../../store/actions";
import s from "./beatContainer.module.css";

const BeatContainer = ({
  firstStarted,
  singleSample,
  startedCount,
  onSFS,
  onASF,
  onUSC,
  onStopAll,
}) => {
  const track = require(`../../assets/sounds/${singleSample.id}.mp3`).default;
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, { stop, sound }] = useSound(track, {
    sprite: {
      1: [0, 4000],
      2: [4000, 4000],
      3: [8000, 4000],
      4: [12000, 4000],
    },
    loop: true,
    onload: () => setIsLoaded(true),
  });

  const [waitingId, setWaitingId] = useState("");
  const [playingId, setPlayingId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const stateStopFunction = () => {
    stop();
    setWaitingId("");
    setPlayingId("");
    setIsPlaying(false);
  };

  const playSound = (id) => {
    const clickMomentTime = Date.now();

    if (!firstStarted) {
      play({ id });
      setPlayingId(id);
      onSFS(clickMomentTime);
    } else {
      setWaitingId(id);
      const playTimeout = setTimeout(() => {
        setWaitingId("");
        setPlayingId(id);
        play({ id });
      }, 4000 - ((clickMomentTime - firstStarted) % 4000));
    }

    setIsPlaying(true);
    onUSC(1);
    onASF(stateStopFunction);
  };

  const switchSound = (id) => {
    const diff = 4000 - ((Date.now() - firstStarted) % 4000);
    setWaitingId(id);
    const switchTimeout = setTimeout(() => {
      stop();
      play({ id });
      setWaitingId("");
      setPlayingId(id);
    }, diff);
  };

  const startPlay = (id) => {
    isLoaded ? (isPlaying ? switchSound(id) : playSound(id)) : null;
  };

  const stopPlay = () => {
    setWaitingId("");
    setPlayingId("");
    setIsPlaying(false);
    if (startedCount === 1) {
      return onStopAll();
    }
    stop();
    onUSC(-1);
  };
  return (
    <div
      className={`${s.soundRow} ${s[singleSample.id]}`}
      key={singleSample.id}
    >
      {singleSample.sprites.map((item) => {
        const id = `${singleSample.id}_${item.id}`;
        let className = "";
        const handleClick =
          item.id === playingId ? stopPlay : () => startPlay(item.id);

        if (playingId === item.id) {
          className = s.active;
        }
        if (waitingId === item.id) {
          className = s[`pulse_background_${singleSample.id}`];
        }

        return (
          <BeatButton
            key={id}
            className={className}
            handleClick={handleClick}
            name={singleSample.name}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (
  { samples, firstStarted, startedCount },
  { soundName }
) => {
  const singleSample = samples.find((item) => item.id === soundName);
  return {
    firstStarted,
    startedCount,
    singleSample,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSFS: (date) => dispatch({ type: SET_FIRST_STARTED, date }),
  onASF: (stop) => dispatch({ type: ADD_STOP_FUNCTION, stop }),
  onUSC: (count) => dispatch({ type: UPDATE_STARTED_COUNT, count }),
  onStopAll: () => dispatch({ type: STOP_TRACK }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeatContainer);
