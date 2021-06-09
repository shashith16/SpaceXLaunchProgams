import Axios from "../http-common";
import queryString from "query-string";

const getLaunchesWithFilter = (queryData = "") => {
  return Axios.get(`/launches/${queryData ? `?${queryData}` : ""}`);
};

const getLaunchesWithoutFilter = () => {
  return Axios.get(`/launches/?limit=100`);
};

const LaunchService = {
  getLaunchesWithFilter,
  getLaunchesWithoutFilter,
};

export default LaunchService;
