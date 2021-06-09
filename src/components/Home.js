import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getLaunchesWithFilters,
  getLaunchesWithoutFilters,
} from "../actions/launches";
import Filters from "./Filters";
import LaunchContent from "./LaunchContent";
import qs from "query-string";
import { objectToQuery } from "../utils";
import Footer from "./Footer";

function Home() {
  const defaultParams = { limit: 100 };
  const dispatch = useDispatch();
  useEffect(() => {
    const parsedQuery = qs.parse(window.location.search);
    console.log(parsedQuery);
    const qParams = objectToQuery({ ...defaultParams, ...parsedQuery });
    dispatch(getLaunchesWithFilters(qParams));
  }, []);

  return (
    <div className="container-fluid py-2">
      <h2>SpaceX Launch Programs</h2>
      <div className="row">
        <div className="col-sm-12 mb-2 col-md-12 col-lg-2 col-xs-12">
          <Filters />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-10 col-xs-12">
          <div className="row">
            <LaunchContent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
