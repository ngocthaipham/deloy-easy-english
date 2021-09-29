/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard PRO React icons
// import Cube from "examples/Icons/Cube";
// import Document from "examples/Icons/Document";
// import Settings from "examples/Icons/Settings";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Custom styles for Header
import styles from "layouts/profile/components/Header/styles";

// Images

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const [tabValue, setTabValue] = useState(0);
  const classes = styles();
  const [cookies] = useCookies();
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/user/${cookies.userName}`).then((response) => {
      setUser(response.data.result);
    });
  }, []);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox customClass={classes.profileHeader_background} />
      <Card className={classes.profileHeader_profile}>
        {user.map((item) => (
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <SuiAvatar
                src={`http://localhost:5000/images/${item.userAvatar}`}
                alt="profile-image"
                variant="rounded"
                size="xl"
                customClass="shadow-sm"
              />
            </Grid>
            <Grid item>
              <SuiBox height="100%" mt={0.5} lineHeight={1}>
                <SuiTypography variant="h5" fontWeight="medium">
                  {item.userName}
                </SuiTypography>
                <SuiTypography variant="button" textColor="text" fontWeight="medium">
                  {item.userEmail}
                </SuiTypography>
              </SuiBox>
            </Grid>
          </Grid>
        ))}
      </Card>
    </SuiBox>
  );
}

export default Header;
