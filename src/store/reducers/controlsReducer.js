import * as actions from "../actions";
import { controls } from "../store";

export const controlsReducer = (state = controls, action) => {
  switch (action.type) {
    case actions.SET_FIRST_STARTED:
      return {
        ...state,
        firstStarted: action.date,
      };
    case actions.ADD_STOP_FUNCTION: {
      return {
        ...state,
        stopTrack: [...state.stopTrack, action.stop],
      };
    }
    case actions.STOP_TRACK: {
      state.stopTrack.map((stop) => stop());
      return {
        stopTrack: [],
        firstStarted: 0,
        startedCount: 0,
      };
    }
    case actions.UPDATE_STARTED_COUNT: {
      return { ...state, startedCount: state.startedCount + action.count };
    }
    default:
      return state;
  }
};
