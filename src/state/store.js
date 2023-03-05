import { configureStore } from "@reduxjs/toolkit";
import graphsReducer from "../containers/Plots/graphSlice";

export default configureStore({
  reducer: {
    graphs: graphsReducer,
  },
});
