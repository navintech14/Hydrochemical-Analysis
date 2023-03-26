import { configureStore } from "@reduxjs/toolkit";
import graphsReducer from "../containers/Plots/graphSlice";
import purposeReducer from "../containers/Purpose/purposeSlice";
import datasetReducer from "../containers/Dashboard/dashboardSlice";

export default configureStore({
  reducer: {
    dataset: datasetReducer,
    graphs: graphsReducer,
    purpose: purposeReducer,
  },
});
