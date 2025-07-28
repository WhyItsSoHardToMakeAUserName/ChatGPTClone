import { useRoutes, type RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";
import React, { type JSX } from "react";

type Route = {
  path: string;
  element: JSX.Element;
};

export default function AppRoutes() {
  const parseRouteObjects = (
    routes: Route[],
  ): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: route.element
    }));
  };

  const publicRouteObjects = parseRouteObjects(publicRoutes);

  const routes = [
    ...publicRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <React.Fragment> {allRoutes} </React.Fragment>;
}