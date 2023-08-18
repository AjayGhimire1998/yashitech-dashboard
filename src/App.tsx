import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import Login from "./components/pages/login";
import Global from "./styles/global";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import { getCurrentUser } from "./services/auth-services/auth-service";
import HomePage from "./components/pages/home-page";
import Custom404Page from "./components/pages/custom-pages/404Page";
import Custom401Page from "./components/pages/custom-pages/401Page";
import ShowCasesPage from "./components/pages/showcases-pages";
import EachShowCase from "./components/pages/showcases-pages/view-each-showcase-page";
import NewShowCasePage from "./components/pages/showcases-pages/create-new-showcase-page";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = useCallback(() => {
    setCurrentUser(getCurrentUser());
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  // growable textarea

  useEffect(() => {
    setTimeout(() => {
      const tx = document.getElementsByTagName("textarea");
      const OnInput = function (this: HTMLTextAreaElement) {
        this.style.height = "0";
        this.style.height = this.scrollHeight + "px";
      };
  
      for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute(
          "style",
          "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
        );
        tx[i].addEventListener("input", OnInput, false);
      }
  
      // Clean up event listeners when component unmounts
      return () => {
        for (let i = 0; i < tx.length; i++) {
          tx[i].removeEventListener("input", OnInput, false);
        }
      };
    }, 0);
  }, []);

  return (
    <>
      <Global />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/homepage"
          element={isAuthenticated ? <HomePage /> : <Custom401Page />}
        />

        <Route
          path="/showcases"
          element={isAuthenticated ? <ShowCasesPage /> : <Custom401Page />}
        />

        <Route
          path="/showcases/:id"
          element={isAuthenticated ? <EachShowCase /> : <Custom401Page />}
        />

        <Route
          path="/showcases/new"
          element={isAuthenticated ? <NewShowCasePage /> : <Custom401Page />}
        />

        <Route path="*" Component={Custom404Page} />
      </Routes>
    </>
  );
};

export default App;
