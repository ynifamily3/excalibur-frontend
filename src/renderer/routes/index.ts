import React from "react";
import WaitingComponent from "hocs/WaitingComponent";

const Intro = React.lazy(() => import("pages/Intro"));
const About = React.lazy(() => import("pages/About"));

export const routes = [
  {
    path: "/",
    component: WaitingComponent(Intro),
  },
  {
    path: "/about",
    component: WaitingComponent(About),
  },
];
