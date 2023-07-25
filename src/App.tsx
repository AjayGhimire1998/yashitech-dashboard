import React, { useState } from "react";
import Login from "./components/login";
import Global from "./styles/global";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { getCurrentUser } from "./services/auth-services/auth-service";
import HomePage from "./components/pages/home-page/HomePage";
import Custom404Page from "./components/pages/custom-pages/404Page";
import Custom401Page from "./components/pages/custom-pages/401Page";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    setCurrentUser(getCurrentUser());
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  //growable textarea
  // const tx = document.getElementsByTagName("textarea");
  // for (let i = 0; i < tx.length; i++) {
  //   tx[i].setAttribute(
  //     "style",
  //     "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  //   );
  //   tx[i].addEventListener("input", OnInput, false);
  // }

  // function OnInput() {
  //   this.style.height = 0;
  //   this.style.height = this.scrollHeight + "px";
  // }

  return (
    <>
      <Global />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated || currentUser ? (
              <Dashboard />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/homepage"
          element={
            isAuthenticated || currentUser ? <HomePage /> : <Custom401Page />
          }
        />
        <Route path="*" Component={Custom404Page} />
      </Routes>
    </>
  );
};

export default App;
