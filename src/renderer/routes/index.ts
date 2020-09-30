import React from "react";
import WaitingComponent from "hocs/WaitingComponent";

const About = React.lazy(() => import("pages/About"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));

export const routes = [
  {
    path: "/about",
    component: WaitingComponent(About),
  },
  {
    path: "/dashboard",
    component: WaitingComponent(Dashboard),
  },
];
