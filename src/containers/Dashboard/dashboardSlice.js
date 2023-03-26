import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataset: [],
};

const DatasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    fetchDataset: (state, { payload }) => {
      state.dataset = payload;
    },
  },
});

export const { fetchDataset } = DatasetSlice.actions;
export const getAllDataset = (state) => state.dataset.dataset;
export default DatasetSlice.reducer;
