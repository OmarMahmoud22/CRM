import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import AuthContext from "./Context/AuthContext.jsx";
import NotificationProvider from "./Context/NotifecationContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContext>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthContext>
  </Provider>,
);
