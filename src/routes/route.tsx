import routes from "../configs/routes";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

import React, { FC } from "react";

export interface IRoute {
  path: string;
  component: FC<{}> | null;
  layout: FC<{ children: React.ReactNode }>;
}

const publicRoutes: IRoute[] = [
  {
    component: Home,
    path: routes?.home,
    layout: MainLayout,
  },

];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
