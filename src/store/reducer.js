import * as actions from "./actions";
import { initialState } from "./store";

export const reducer = (state = initialState, action) => {
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
        ...state,
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
