import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import "zmp-ui/zaui.css";
import "./css/tailwind.css";
// import appConfig from "../app-config.json";

// if (!window.APP_CONFIG) {
//   window.APP_CONFIG = appConfig;
// }


const root = createRoot(document.getElementById("root")!);
root.render(React.createElement(App));