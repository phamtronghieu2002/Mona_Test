import Profile from "@/pages/Profile/Profile";
import routes from "../configs/routes";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

import React, { FC } from "react";
import DataProvider from "@/pages/Home/context/DataContext";

export interface IRoute {
  path: string;
  component: FC<{}> | null;
  layout: FC<{ children: React.ReactNode }>;
  roles:string []
}

const publicRoutes: IRoute[] = [
  {
    component: DataProvider,
    path: "/",
    layout: MainLayout,
    roles:["admin","teacher"]
  },
  {
    component: Profile,
    path: "/profile",
    layout: MainLayout,
    roles:["student","teacher","admin"]

  },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
