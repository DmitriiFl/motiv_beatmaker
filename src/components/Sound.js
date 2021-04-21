import React from "react";
import useSound from "use-sound";
import { connect } from "react-redux";
import {
  ADD_STOP_FUNCTION,
  SET_FIRST_STARTED,
  SET_IS_ITEM_PLAYING,
  SET_IS_ITEM_WAITING,
  SET_IS_PLAYING,
  SET_PLAYING_ID,
  STOP_TRACK,
  UPDATE_STARTED_COUNT,
} from "../store/actions";
// import arp from "../sounds/arp.mp3";
// import bass from "../sounds/bass.mp3";
// import hihet from "../sounds/hihet.mp3";
// import kick from "../sounds/kick.mp3";
// import pad from "../sounds/pad.mp3";
// import snare from "../sounds/snare.mp3";

const Sound = ({
  firstStarted,
  singleSample,
  startedCount,
  onSFS,
  onASF,
  onSIP,
  onSPI,
  onSIIP,
  onSIIW,
  onUSC,
  onStopAll,
}) => {
  const sound = require(`./src/assets/sounds`).default;

  // let thisSound;
  //   // switch (singleSample.id) {
  //   //   case "bass":
  //   //     thisSound = bass;
  //   //     break;
  //   //   case "arp":
  //   //     thisSound = arp;
  //   //     break;
  //   //   case "hihet":
  //   //     thisSound = hihet;
  //   //     break;
  //   //   case "kick":
  //   //     thisSound = kick;
  //   //     break;
  //   //   case "pad":
  //   //     thisSound = pad;
  //   //     break;
  //   //   case "snare":
  //   //     thisSound = snare;
  //   //     break;
  //   // }

  const [play, { stop }] = useSound(sound, {
    sprite: {
      1: [0, 4000],
      2: [8000, 4000],
      3: [16000, 4000],
      4: [24000, 4000],
    },
    loop: true,
  });
  const switchSound = (id) => {
    const diff = 4000 - ((Date.now() - firstStarted) % 4000);
    onSIIW(singleSample.id, id);

    setTimeout(() => {
      stop();
      play({ id });
      onSPI(singleSample.id, id);
      onSIIP(singleSample.id, id);
      onSIIW(singleSample.id, id);
      onSIIP(singleSample.id, singleSample.playingId);
    }, diff);
  };
  const playSound = (id) => {
    onSIP(singleSample.id, true);
    onSPI(singleSample.id, id);
    onSIIP(singleSample.id, id);
    onUSC(1);

    if (!firstStarted) {
      onSFS();
      play({ id });
    } else {
      const a = Date.now();
      onSIIW(singleSample.id, id);
      setTimeout(() => {
        onSIIW(singleSample.id, id);
        play({ id });
      }, 4000 - ((a - firstStarted) % 4000));
    }
    onASF(stop);
  };
  const startPlay = (id) => {
    singleSample.isPlaying ? switchSound(id) : playSound(id);
  };

  const stopPlay = (id) => {
    if (startedCount === 1) {
      return onStopAll();
    }
    stop();
    onUSC(-1);
    onSPI(singleSample.id, "");
    onSIIP(singleSample.id, id);
    onSIP(singleSample.id, false);
  };

  return (
    <div className={`sound-row ${singleSample.id}`}>
      {singleSample.items.map((item) => {
        const id = `${singleSample.id}_${item}`;

        let className = "";
        if (singleSample.playingId === item) {
          className = "active";
        }
        if (singleSample.items_new[+item - 1].isWaiting) {
          className = "pulse-background";
        }

        return (
          <button
            className={className}
            key={id}
            id={id}
            onClick={() =>
              singleSample.items_new[+item - 1].isPlaying
                ? stopPlay(item)
                : startPlay(item)
            }
          >
            {singleSample.id.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

const mapStateToProps = (
  { firstStarted, startedCount, samples },
  { soundName }
) => {
  const singleSample = samples.filter((item) => item.id === soundName);
  return { firstStarted, startedCount, singleSample: singleSample[0] };
};
const mapDispatchToProps = (dispatch) => ({
  onSFS: () => dispatch({ type: SET_FIRST_STARTED }),
  onASF: (stop) => dispatch({ type: ADD_STOP_FUNCTION, stop }),
  onSIP: (id, isPlaying) => dispatch({ type: SET_IS_PLAYING, id, isPlaying }),
  onSPI: (id, playingId) => dispatch({ type: SET_PLAYING_ID, id, playingId }),
  onSIIP: (sampleId, itemId) =>
    dispatch({ type: SET_IS_ITEM_PLAYING, sampleId, itemId }),
  onSIIW: (sampleId, itemId) =>
    dispatch({ type: SET_IS_ITEM_WAITING, sampleId, itemId }),
  onUSC: (count) => dispatch({ type: UPDATE_STARTED_COUNT, count }),
  onStopAll: () => dispatch({ type: STOP_TRACK }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
