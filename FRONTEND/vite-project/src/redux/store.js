import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice.js";
import leadReducer from "./slices/LeadsSlice.js";
import usersReducer from "./slices/UsersSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
    users: usersReducer,
  },
});
