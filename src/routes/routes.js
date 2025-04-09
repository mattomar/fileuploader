import React from "react";

import Login from "../pages/logIn";
import Signup from "../pages/signUp";
import Home from "../pages/home";
import FolderPage from "../pages/folder";
import FolderDetails from "../pages/FolderDetails";


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
  },
  {
    path: "/folders",
    element: <FolderPage />
  },
  { path: "/folder/:id", 
  element: <FolderDetails /> 
},

  ];
  
  export default routes;