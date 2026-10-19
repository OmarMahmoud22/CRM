import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../../config/api.js";

const getInitialAuthState = () => {
  if (typeof localStorage === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      full_name: "",
    };
  }
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      full_name: "",
    };
  }
  try {
    const decoded = jwtDecode(token);
    const storedName = localStorage.getItem("full_name") || decoded.full_name || "";
    return {
      user: decoded,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
      full_name: storedName,
    };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      full_name: "",
    };
  }
};

const initialState = getInitialAuthState();

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const targetUrl = `${API_BASE_URL}/login`;

  // Diagnostic logging requested for troubleshooting login connectivity
  console.log("[Auth/Login] Dispatching request:", {
    fullTargetUrl: targetUrl,
    apiBaseUrl: API_BASE_URL,
    viteEnvApiUrl:
      typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL,
    payload: {
      email: data?.email,
      password: data?.password ? "***" : undefined,
    },
  });

  try {
    const res = await axios.post(targetUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[Auth/Login] Response received:", {
      status: res.status,
      data: res.data,
    });

    const token = res.data.token;
    const full_name = res.data.full_name || "";
    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);
    if (full_name) {
      localStorage.setItem("full_name", full_name);
    }

    return {
      user: decoded,
      token,
      full_name,
    };
  } catch (error) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    let errorDetail = "";
    if (status) {
      const backendMsg =
        typeof responseData === "string"
          ? responseData
          : responseData?.msg ||
            responseData?.message ||
            JSON.stringify(responseData);
      errorDetail = `[HTTP ${status}] ${backendMsg || "Server error"}`;
    } else if (error.request) {
      errorDetail = `[Network Error] Failed to reach backend at ${targetUrl}. Check CORS or server status.`;
    } else {
      errorDetail = error.message || "Login failed";
    }

    console.error("[Auth/Login] Request failed:", {
      targetUrl,
      status,
      responseData,
      errorMessage: error.message,
    });

    return thunkAPI.rejectWithValue(errorDetail);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("full_name");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.full_name = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.full_name = action.payload.full_name;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
