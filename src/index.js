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
import Home from "containers/Home";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    element: <Home />,
    nodeRef: createRef(),
  },
  {
    path: "/dataset",
    name: "Dataset",
    element: <Dashboard />,
    nodeRef: createRef(),
  },
  // {
  //   path: '/project',
  //   name: 'Project',
  //   element: <Project />,
  //   nodeRef: createRef(),
  // },
  // { path: '/about', name: 'About', element: <About />, nodeRef: createRef() },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   element: <Contact />,
  //   nodeRef: createRef(),
  // },
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
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
