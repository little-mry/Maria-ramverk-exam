import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { router } from "./router.tsx";
import "./main.scss";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {<RouterProvider router={router} />}
    </PersistGate>
  </Provider>
);
