/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Axios from "axios";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [messageError, setMessageError] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const history = useHistory();

  const login = () => {
    const data = {
      userName,
      userPassword,
    };
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/login`, data)
      .then((response) => {
        setCookie("token", response.data.token, { path: "/" });
        setCookie("userId", response.data.userId, { path: "/" });
        setCookie("userName", response.data.userName, { path: "/" });
        history.push(`/my-course`);
      })
      .catch(() => {
        setMessageError("Usernames or Password is incorrect");
      });
    console.log(cookies);
    console.log(messageError);
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your username and password to sign in"
      image={curved9}
    >
      <SuiBox
        component="form"
        role="form"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </SuiBox>
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            customClass="cursor-pointer user-select-none"
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
            sign in
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              textColor="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
