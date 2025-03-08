import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { router } from "./router.tsx";
import './main.scss'
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    {<RouterProvider router={router} />}
    </Provider>
  </StrictMode>
);
