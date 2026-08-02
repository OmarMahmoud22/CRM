import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import leadReducer from "./slices/LeadsSlice";
import usersReducer from "./slices/UsersSlice"


export const store = configureStore({

  reducer: {
    auth: authReducer,
    lead: leadReducer,
    users: usersReducer
  },
 });

