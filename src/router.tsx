import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Menu from "./pages/Menu";
import Receipt from "./pages/Receipt";
import EtaScreen from "./pages/EtaScreen";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Menu/>} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/eta" element={<EtaScreen/>} />


        </Route>
    )
)