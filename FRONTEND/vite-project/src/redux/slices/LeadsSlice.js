import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL, { getAuthHeaders } from "../../config/api.js";

const initialState = {
  loading: false,
  error: null,
  leads: [],
  length: 0,
};

export const getAllLead = createAsyncThunk(
  "lead/getAllLead",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashbourd_admin/allLead`, {
        headers: getAuthHeaders(),
      });

      const leads = res.data.all_leads || res.data.lead || [];
      const length = res.data.length ?? res.data.totallead ?? leads.length;

      return {
        leads,
        length,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to load leads",
      );
    }
  },
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    updateLeadInState: (state, action) => {
      const updated = action.payload;
      const index = state.leads.findIndex((l) => l._id === updated._id);
      if (index !== -1) {
        state.leads[index] = { ...state.leads[index], ...updated };
      }
    },
  },

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

export const { updateLeadInState } = leadSlice.actions;
export default leadSlice.reducer;
