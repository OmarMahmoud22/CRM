import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  full_name: "",
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:4000/api/login", data);

    const token = res.data.token;
    const full_name = res.data.full_name;
    const decoded = jwtDecode(token);
    console.log(full_name);
    console.log(res.data);

    localStorage.setItem("token", token);

    return {
      user: decoded,
      token,
      full_name,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Login failed",
    );
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.full_name = action.payload.full_name;
        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;



