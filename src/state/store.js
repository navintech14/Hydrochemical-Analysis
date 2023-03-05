import { configureStore } from "@reduxjs/toolkit";
import graphsReducer from "../containers/Plots/graphSlice";
import purposeReducer from "../containers/Purpose/purposeSlice";

export default configureStore({
  reducer: {
    graphs: graphsReducer,
    purpose: purposeReducer,
  },
});
