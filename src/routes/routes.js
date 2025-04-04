import React from "react";

import Login from "../pages/logIn";
import Signup from "../pages/signUp";
import Home from "../pages/home";


const routes = [
    {
      path: "/",
      element: <Home />, // Default route
    },
    {
      path: "/signup",
      element: <Signup />, // Default route
    },
    {
    path: "/login",
    element: <Login />, // Default route
  }

  ];
  
  export default routes;