import {
  LAUNCHES_WITHOUT_FILTERS_ERROR,
  LAUNCHES_WITHOUT_FILTERS_REQUEST,
  LAUNCHES_WITHOUT_FILTERS_SUCCESS,
  LAUNCHES_WITH_FILTERS_ERROR,
  LAUNCHES_WITH_FILTERS_REQUEST,
  LAUNCHES_WITH_FILTERS_SUCCESS,
} from "./types";

import LaunchesDataService from "../services/LaunchesService";

export const getLaunchesWithoutFilters = () => async (dispatch) => {
  dispatch({
    type: LAUNCHES_WITHOUT_FILTERS_REQUEST,
  });
  try {
    const res = await LaunchesDataService.getLaunchesWithoutFilter();
    dispatch({
      type: LAUNCHES_WITHOUT_FILTERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LAUNCHES_WITHOUT_FILTERS_ERROR,
      payload: error,
    });
  }
};

export const getLaunchesWithFilters = (data) => async (dispatch) => {
  dispatch({
    type: LAUNCHES_WITH_FILTERS_REQUEST,
  });
  try {
    const res = await LaunchesDataService.getLaunchesWithFilter(data);
    dispatch({
      type: LAUNCHES_WITH_FILTERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LAUNCHES_WITH_FILTERS_ERROR,
      payload: error,
    });
  }
};
