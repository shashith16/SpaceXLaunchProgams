import {
  LAUNCHES_WITHOUT_FILTERS_REQUEST,
  LAUNCHES_WITHOUT_FILTERS_SUCCESS,
  LAUNCHES_WITHOUT_FILTERS_ERROR,
  LAUNCHES_WITH_FILTERS_REQUEST,
  LAUNCHES_WITH_FILTERS_SUCCESS,
  LAUNCHES_WITH_FILTERS_ERROR,
} from "../actions/types";
const InitialState = {
  launchesLoading: false,
  launchesData: [],
  launchesDataSuccess: null,
  launchesDataError: null,
  filteredLaunchesLoading: false,
  filteredLaunchesData: [],
  filteredLaunchesDataSuccess: null,
  filteredLaunchesDataError: null,
};
function launchesReducer(state = InitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LAUNCHES_WITHOUT_FILTERS_REQUEST: {
      return {
        ...state,
        launchesLoading: true,
        launchesDataError: null,
        launchesDataSuccess: null,
      };
    }
    case LAUNCHES_WITHOUT_FILTERS_SUCCESS: {
      return { ...state, launchesData: payload, launchesLoading: false };
    }
    case LAUNCHES_WITHOUT_FILTERS_ERROR: {
      return { ...state, launchesDataError: payload };
    }
    case LAUNCHES_WITH_FILTERS_REQUEST: {
      return {
        ...state,
        filteredLaunchesLoading: true,
        filteredLaunchesDataError: null,
        filteredLaunchesDataSuccess: null,
      };
    }
    case LAUNCHES_WITH_FILTERS_SUCCESS: {
      return {
        ...state,
        filteredLaunchesData: payload,
        filteredLaunchesLoading: false,
      };
    }
    case LAUNCHES_WITH_FILTERS_ERROR: {
      return { ...state, filteredLaunchesDataError: payload };
    }
    default:
      return state;
  }
}

export default launchesReducer;
