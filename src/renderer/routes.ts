import React from "react";
import WaitingComponent from "hocs/WaitingComponent";

const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Analysis = React.lazy(() => import("pages/AnalysisScreen"));
const SignUp = React.lazy(() => import("pages/SignUp"));
const Settings = React.lazy(() => import("pages/Settings"));

export const routes = [
  {
    path: "/dashboard",
    component: WaitingComponent(Dashboard),
  },
  {
    path: "/analysis",
    component: WaitingComponent(Analysis),
  },
  {
    path: "/signup",
    component: WaitingComponent(SignUp),
  },
  {
    path: "/settings",
    component: WaitingComponent(Settings),
  },
];
