import React from "react";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import {
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./sideBarStyle.scss";
function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          navigate(itemId);
        }}
        items={[
          {
            title: "Dashboard",
            itemId: "/",
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <i class="fa-solid fa-table-columns"></i>,
          },
          // {
          //   title: "View Data",
          //   itemId: "/inputdataset",
          //   // you can use your own custom Icon component as well
          //   // icon is optional
          //   elemBefore: () => <i class="fa-solid fa-folder-tree"></i>,
          // },
          {
            title: "Visualize",
            itemId: "/visualize",
            elemBefore: () => <i class="fa-solid fa-chart-simple"></i>,
            subNav: [
              {
                title: "Triangle Piper",
                itemId: "/trianglepiper",
                elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              },

              // {
              //   title: "Color-coded Piper",
              //   itemId: "/colorcodedpiper",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              // {
              //   title: "Contour-filled Piper",
              //   itemId: "/contourfilledpiper",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              {
                title: "Durov",
                itemId: "/durov",
                elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              },
              // {
              //   title: "Stiff",
              //   itemId: "/stiff",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              // {
              //   title: "Chernoff face",
              //   itemId: "/chernoffface",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              // {
              //   title: "Schoeller",
              //   itemId: "/schoeller",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              {
                title: "Gibbs",
                itemId: "/gibbs",
                elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              },
              {
                title: "Chadha",
                itemId: "/chadha",
                elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              },
              // {
              //   title: "USSL",
              //   itemId: "/ussl",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              // {
              //   title: "Gaillardet",
              //   itemId: "/gaillardet",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
              // {
              //   title: "HFE-D",
              //   itemId: "/hfed",
              //   elemBefore: () => <i class="fa-solid fa-angle-right"></i>,
              // },
            ],
          },
          // {
          //   title: "Map",
          //   itemId: "/map",
          //   elemBefore: () => <i class="fa-solid fa-map"></i>,
          //   // subNav: [
          //   //   {
          //   //     title: "Section 3.1",
          //   //     itemId: "/3.1",
          //   //   },
          //   // ],
          // },
          // {
          //   title: "Generate Report",
          //   itemId: "/generatereport",
          //   elemBefore: () => <i class="fa-solid fa-receipt"></i>,
          //   // subNav: [
          //   //   {
          //   //     title: "Section 3.1",
          //   //     itemId: "/3.1",
          //   //   },
          //   // ],
          // },
        ]}
      />
    </>
  );
}

SideBar.propTypes = {};

export default SideBar;
