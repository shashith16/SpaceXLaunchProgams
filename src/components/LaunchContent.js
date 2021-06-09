import React from "react";
import { useSelector } from "react-redux";
import { launchesSelector } from "../selectors";

function LaunchContent() {
  const { launchesData, filteredLaunchesData } = useSelector(launchesSelector);
  console.log("launchesData.....l", launchesData);
  console.log("filteredLaunchesData.....l", filteredLaunchesData);
  return filteredLaunchesData.map((fdata) => {
    return (
      <div
        key={fdata.launch_date_unix}
        className="col-lg-3 col-sm-12 col-md-6 col-xs-12 mb-2 px-1"
      >
        <div className="card">
          <img
            src={fdata.links.mission_patch_small}
            className="card-img-top"
            alt={fdata.links.mission_patch_small}
          />
          <div className="card-body">
            <h5 className="card-title">
              {fdata.mission_name} #{fdata.flight_number}
            </h5>
            <div className="card-text">
              <div>
                <strong>Mission Ids: </strong>
                <ul>
                  {fdata.mission_id.map((missionId) => {
                    return <li key={missionId}>{missionId}</li>;
                  })}
                </ul>
              </div>
              <div>
                <strong>Launch Year: </strong>
                <span>{fdata.launch_year}</span>
              </div>
              <div>
                <strong>Successful Launch: </strong>
                <span>{fdata?.launch_success?.toString()}</span>
              </div>
              <div>
                <strong>Successful Landing: </strong>
                <span>{fdata?.land_success?.toString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default LaunchContent;
