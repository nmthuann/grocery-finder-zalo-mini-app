import { App, Box, SnackbarProvider, ZMPRouter } from "zmp-ui";
import "../css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import Navigation from "./ui/navigation";
import { RecoilRoot } from "recoil";
import CartPage from "../pages/cart/cart";
import { ScrollRestoration } from "./ui/scroll-restoration";
import ScanPage from "../pages/scan";
import SettingPage from "../pages/setting";
import CategoryPage from "../pages/category";
import SearchPage from "../pages/search";

function MyApp() {
    return (
        <RecoilRoot>
            <App>
                <SnackbarProvider>
                    <ZMPRouter>
                        <Router>
                            <Box
                                flex
                                flexDirection="column"
                                className="h-screen"
                            >
                                <ScrollRestoration />
                                <Box className="flex-1 flex flex-col overflow-hidden">
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<HomePage />}
                                        ></Route>
                                        <Route
                                            path="/search"
                                            element={<SearchPage />}
                                        ></Route>
                                        <Route
                                            path="/category"
                                            element={<CategoryPage />}
                                        ></Route>
                                        <Route
                                            path="/scan"
                                            element={<ScanPage />}
                                        ></Route>
                                        <Route
                                            path="/cart"
                                            element={<CartPage />}
                                        ></Route>
                                        <Route
                                            path="/setting"
                                            element={<SettingPage />}
                                        ></Route>
                                    </Routes>
                                </Box>
                                <Navigation />
                            </Box>
                        </Router>
                    </ZMPRouter>
                </SnackbarProvider>
            </App>
        </RecoilRoot>
    );
}

export default MyApp;
