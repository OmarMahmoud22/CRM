import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL, { getAuthHeaders } from "../../config/api.js";

const initialState = {
  users: [],
  error: null,
  loading: false,
  length: 0,
  user: null,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/dashbourd_admin/allusers`,
        {
          headers: getAuthHeaders(),
        },
      );
      const users = res.data.users || [];
      const length = res.data.length ?? users.length;

      return {
        users,
        length,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to load users",
      );
    }
  },
);

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/infouser/${id}`, {
        headers: getAuthHeaders(),
      });
      return {
        user: res.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to load user info",
      );
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.length = action.payload.length;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
