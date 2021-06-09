import { createSelector } from "reselect";

export const launchesSelector = createSelector(
  (store) => store.launchesReducer,
  (launchesStore) => launchesStore
);
