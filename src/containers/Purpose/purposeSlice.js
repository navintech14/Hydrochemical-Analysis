import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purpose: [],
};

const PurposeSlice = createSlice({
  name: "purpose",
  initialState,
  reducers: {
    fetchPurpose: (state, { payload }) => {
      state.purpose = payload;
    },
  },
});

export const { fetchPurpose } = PurposeSlice.actions;
export const getAllPurpose = (state) => state.purpose.purpose;
export default PurposeSlice.reducer;
