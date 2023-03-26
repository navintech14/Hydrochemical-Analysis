import "index.scss";

import * as serviceWorker from "serviceWorker";

import React, { createRef } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import store from "state/store";
import {
  createHashRouter,
  RouterProvider,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Container } from "reactstrap";
import Dashboard from "containers/Dashboard";
import Titlebar from "components/titlebar/Titlebar";
import Navbar from "components/Navbar";
// import Home from "containers/Home";
import Plots from "containers/Plots";
import Purpose from "containers/Purpose";
import Report from "containers/Report";

const routes = [
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   element: <Home />,
  //   nodeRef: createRef(),
  // },
  {
    path: "/",
    name: "Dataset",
    element: <Dashboard />,
    nodeRef: createRef(),
  },
  {
    path: "/plots",
    name: "Plots",
    element: <Plots />,
    nodeRef: createRef(),
  },
  {
    path: "/purpose",
    name: "Purpose",
    element: <Purpose />,
    nodeRef: createRef(),
  },
  {
    path: "/report",
    name: "Report",
    element: <Report />,
    nodeRef: createRef(),
  },
];

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  return (
    <>
      <Titlebar />
      <Navbar />
      <Container>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
