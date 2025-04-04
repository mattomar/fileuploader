import React from "react";
import routes from "./routes/routes";
import "../src/styles/App.css";
import Header from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Keep Header outside Routes */}
      <div className="app-container">
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;