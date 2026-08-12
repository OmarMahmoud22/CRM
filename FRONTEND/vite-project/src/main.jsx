// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import AuthContext from "./Context/AuthContext.jsx";
<<<<<<< HEAD
import NotificationProvider from "./Context/NotifecationContext.jsx";
=======
>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
// import {BrowserRouter} from 'react-router-dom'
import NotificationProvider from "./Context/NotifecationContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <NotificationProvider>
<<<<<<< HEAD
      <App />
=======
      <Provider store={store}>
        <App />
      </Provider>
>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
    </NotificationProvider>
  </AuthContext>,
);
