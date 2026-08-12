import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  leads: [],
  //   token: null,
  length: 0,
};

export const getAllLead = createAsyncThunk(
  "lead/AllLeads",
  async (thunkAPI) => {
    try {
        
        const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://127.0.0.1:4000/api/dashbourd_admin/allLead",
        {headers:{
            Authorization:`Bearer ${token}`
        }}
      );
      console.log(res.data);
      
      const leads = res.data.all_leads;
      const leangth = res.data.length;
      return {
        leads,
        leangth,
        // token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.msg || "no leads");
    }
  },
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.length = action.payload.length;
        state.error = null;
      })
      .addCase(getAllLead.rejected, (state, action) => {
        state.loading = false;
         state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
