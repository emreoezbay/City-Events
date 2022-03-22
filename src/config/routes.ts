import Home from "../pages/Home";

import { Route } from "../types/Route";

const routes: Array<Route> = [
  {
    key: "router-home",
    title: "Home",
    description: "Home",
    component: Home,
    path: "/",
    isEnabled: true,
  },
];

export default routes;
