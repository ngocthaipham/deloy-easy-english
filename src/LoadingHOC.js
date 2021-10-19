import React, { useState } from "react";
import ReactLoading from "react-loading";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export const LoadingHOC = (Component) => {
   function HOC(props) {
    const [isLoading, setIsLoading] = useState(true);
    const setLoadingState = (isComponentLoading) => {
      setIsLoading(isComponentLoading);
    };
    return (
      <>
      <DashboardLayout>
        <DashboardNavbar />
            <Component {...props} setIsLoading={setLoadingState} />
        <Card>
          {isLoading && (
            <div className="loading">
              <div className="spin">
                <ReactLoading type="spin" color="blue" />
              </div>
            </div>
          )}
        </Card>
        </DashboardLayout>
      </>
    );
  };
  return HOC;
};
export default LoadingHOC;
