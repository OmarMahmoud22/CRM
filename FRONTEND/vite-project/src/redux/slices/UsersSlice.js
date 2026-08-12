import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useParams } from "react-router-dom";
const initialState = {
  users: [],
  error: null,
  loading: false,
  length: 0,
  // id: "",
  user:null
};

const token = localStorage.getItem("token");

export const getUsers = createAsyncThunk(
  "user/getusers",
  async (arg, thunkAPI) => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:4000/api/dashbourd_admin/allusers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      const { users, length } = res.data;

      return {
        users,
        length,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  "users/info",
  async (id, thunkAPI) => {
    try {
      // const { id } = useParams();
      const res = await axios.get(`http://127.0.0.1:4000/api/infouser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.user);
      const { user } = res.data;
      return {
        user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (bulder) => {
    bulder
      .addCase(getUsers.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        ((state.users = action.payload.users),
          (state.length = action.payload.length),
          (state.loading = false));
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      // ----------------------------------------------------------------------------------
      .addCase(getUserInfo.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(getUserInfo.fulfilled,(state , action)=>{
        state.user = action.payload.user
        state.loading=false
        // state.id = action.payload.id
      })
      .addCase(getUserInfo.rejected , (state , action)=>{
        state.loading = true,
        state.error = action.payload
      })
  },
});

export default usersSlice.reducer;
