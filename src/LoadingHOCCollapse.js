import React, { useState } from "react";
import ReactLoading from "react-loading";
import Card from "@mui/material/Card";

export const LoadingHOCCollapse = (Component) => {
  function HOC(props) {
    const [isLoading, setIsLoading] = useState(true);
    const setLoadingState = (isComponentLoading) => {
      setIsLoading(isComponentLoading);
    };
    return (
      <>

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
      </>
    );
  }
  return HOC;
};
export default LoadingHOCCollapse;
