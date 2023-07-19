import React from "react";
import Login from "./components/login";
import Global from "./styles/global";

const App: React.FC = () => {
  return (
    <main>
      <Global />
      <Login />
    </main>
  );
};

export default App;
