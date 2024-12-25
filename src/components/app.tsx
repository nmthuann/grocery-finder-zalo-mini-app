import { App, Box, ZMPRouter } from "zmp-ui";
import "../css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/home";
import PolicyPage from "../pages/policy";
import Navigation from "./navigation";
import { RecoilRoot } from "recoil";

function MyApp() {
    return (
        <RecoilRoot>
            <App>
                <ZMPRouter>
                    <Router>
                        <Box flex flexDirection="column" className="h-screen">
                            <div></div>
                            <Box className="flex-1 flex flex-col overflow-hidden">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<HomePage />}
                                    ></Route>
                                    <Route
                                        path="/policy"
                                        element={<PolicyPage />}
                                    ></Route>
                                    <Route
                                        path="/cart"
                                        element={<PolicyPage />}
                                    ></Route>
                                    <Route
                                        path="/me"
                                        element={<PolicyPage />}
                                    ></Route>
                                </Routes>
                            </Box>
                            <Navigation />
                        </Box>
                    </Router>
                </ZMPRouter>
            </App>
        </RecoilRoot>
    );
}

export default MyApp;
