import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  graph: [],
};

const GraphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    fetchData: (state, { payload }) => {
      state.graph = payload;
    },
  },
});

export const { fetchData } = GraphSlice.actions;
export const getAllGraph = (state) => state.graphs.graph;
export default GraphSlice.reducer;
