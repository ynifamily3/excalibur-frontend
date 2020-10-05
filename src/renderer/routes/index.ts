import React from "react";
import WaitingComponent from "hocs/WaitingComponent";

const About = React.lazy(() => import("pages/About"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Analysis = React.lazy(() => import("pages/AnalysisScreen"));

export const routes = [
  {
    path: "/about",
    component: WaitingComponent(About),
  },
  {
    path: "/dashboard",
    component: WaitingComponent(Dashboard),
  },
  {
    path: "/analysis",
    component: WaitingComponent(Analysis),
  },
];
