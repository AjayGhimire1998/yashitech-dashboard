import React from "react";
import Login from "./components/login";
import Global from "./styles/global";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Global />
      <Routes>
        <Route path="/" Component={Login} />
      </Routes>
    </>
  );
};

export default App;
