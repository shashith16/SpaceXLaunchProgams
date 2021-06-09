import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { launchesSelector } from "../selectors";
import qs from "query-string";
import { objectToQuery } from "../utils";
import history from "../history";
import { getLaunchesWithoutFilters } from "../actions/launches";

function Filters() {
  const defaultParams = { limit: 100 };
  const dispatch = useDispatch();
  const { launchesData, filteredLaunchesData } = useSelector(launchesSelector);
  const filters = qs.parse(window.location.search);
  console.log("filters...", filters);
  const launchesYears = Object.keys(
    launchesData.reduce((result, launchItem) => {
      if (launchItem.launch_year) result[launchItem.launch_year] = true;
      return result;
    }, {})
  );
  const handleFiltersChange = (filters) => {
    const queryObj = qs.parse(window.location.search);
    const qParams = objectToQuery({
      ...defaultParams,
      ...queryObj,
      ...filters,
    });
    history.push(`/?${qParams}`);
    window.location.reload();
  };

  const handleRemoveFilter = (currentFilter) => {
    console.log("currentFilter", currentFilter);
    const queryObj = qs.parse(window.location.search);
    console.log("queryObj...", queryObj);

    const filteredFilters = Object.keys(queryObj)
      .filter((filterKey) => !currentFilter[filterKey])
      .reduce((result, filterKey) => {
        if (!result[filterKey]) {
          result[filterKey] = queryObj[filterKey];
        }
        return result;
      }, {});
    console.log("filteredFilters...", filteredFilters);
    const qParams = objectToQuery({
      ...defaultParams,
      ...filteredFilters,
    });
    history.push(`/?${qParams}`);
    window.location.reload();
  };

  useEffect(() => {
    const queryObj = qs.parse(window.location.search);
    console.log(queryObj);
    const qParams = objectToQuery({ ...defaultParams, ...queryObj });
    dispatch(getLaunchesWithoutFilters(qParams));
  }, []);
  //   console.log("launchesYears...", launchesYears);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Filters</h5>
        {filters &&
          Object.keys(filters)
            .filter((key) => key != "limit")
            .map((key, index) => (
              <button
                className="btn btn-primary btn-sm m-1"
                key={index}
                onClick={() => handleRemoveFilter({ [key]: filters[key] })}
              >
                <span>
                  <i className="fa fa-close me-1"></i>
                </span>
                {key && key == "launch_year"
                  ? "Launch Year"
                  : key == "launch_success"
                  ? "Success Launch"
                  : "Success Land"}{" "}
                : {filters[key]}
              </button>
            ))}
        <div className="card-text">
          <div className="my-2 text-center">
            <div>
              <u>Launch year</u>
            </div>

            <div>
              {launchesYears.map((launchYear) => (
                <button
                  className={`btn btn-primary btn-sm mar-flt ${
                    Object.values(filters).includes(launchYear) ? "active" : ""
                  }`}
                  key={launchYear}
                  onClick={() =>
                    handleFiltersChange({
                      ...filters,
                      launch_year: launchYear,
                    })
                  }
                >
                  {launchYear}
                </button>
              ))}
            </div>
          </div>
          <div className="my-2 text-center">
            <div>
              <u>Successful Launch</u>
            </div>
            <div>
              <button
                className={`btn btn-primary btn-sm mar-flt ${
                  filters["launch_success"] &&
                  filters["launch_success"] === "true"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleFiltersChange({ ...filters, launch_success: true })
                }
              >
                true
              </button>
              <button
                className={`btn btn-primary btn-sm mar-flt ${
                  filters["launch_success"] &&
                  filters["launch_success"] === "false"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleFiltersChange({ ...filters, launch_success: false })
                }
              >
                false
              </button>
            </div>
          </div>
          <div className="my-2 text-center">
            <div>
              <u>Successful Landing</u>
            </div>
            <div>
              <button
                className={`btn btn-primary btn-sm mar-flt ${
                  filters["land_success"] && filters["land_success"] === "true"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleFiltersChange({ ...filters, land_success: true })
                }
              >
                true
              </button>
              <button
                className={`btn btn-primary btn-sm mar-flt ${
                  filters["land_success"] && filters["land_success"] === "false"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleFiltersChange({ ...filters, land_success: false })
                }
              >
                false
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
