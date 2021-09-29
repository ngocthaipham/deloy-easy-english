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

// @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
import Table from "examples/Table";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data

// Images

function Overview() {
  const [cookies] = useCookies();
  const [user, setUser] = useState([]);
  const [learningList, setLearningList] = useState([]);
  const columns = [
    { name: "Date", align: "center" },
    { name: "Time Learning", align: "center" },
    { name: "Score", align: "center" },
  ];

  useEffect(() => {
    Axios.get(`http://localhost:5000/user/${cookies.userName}`).then((response) => {
      setUser(response.data.result);
      console.log(user);
    });
  }, []);
  useEffect(() => {
    Axios.get(`http://localhost:5000/time/${cookies.userName}`).then((response) => {
      setLearningList(
        response.data.result.map((item) => ({
          Date: item.date,
          "Time Learning": item.totalTimeLearning,
          Score: item.totalScore,
        }))
      );
      console.log(learningList);
    });
  }, []);
  return (
    <DashboardLayout>
      <Header />
      {/* <SuiBox mt={5} mb={3}>
        {user.map((item) => (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                info={{
                  totaltime: `${item.totalTime}`,
                  totalscore: `${item.totalScore}`,
                  target: `${item.target}`,
                  streak: `${item.streak}`,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>
            <Grid item xs={12} xl={4}>
              <p>a</p>
            </Grid>
          </Grid>
        ))}
      </SuiBox> */}
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Table columns={columns} rows={learningList} />
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
