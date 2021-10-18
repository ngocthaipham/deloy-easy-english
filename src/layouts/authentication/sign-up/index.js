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

import Axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userYear, setUserYear] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [messageError, setMessageError] = useState();
  const history = useHistory();

  const handleSetAgremment = () => setAgremment(!agreement);

  const register = () => {
    const data = {
      userName,
      userEmail,
      userYear,
      userPassword,
    };
    if (repeatPassword !== userPassword) {
      alert("both password must match");
    }
    Axios.post("https://server-easyenglish.herokuapp.com//signup", data).then((response) => {
      console.log(response.data);
      history.push(`/authentication/sign-in`);
    });
  };

  const err = {};
  const regexEmail = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  const validateInput = () => {
    if (userName.length < 6) {
      err.userName = "Username must have more than 6 characters";
    }
    if (!regexEmail.test(userEmail.toLowerCase())) {
      err.userEmail = "Email address is invalid";
    }
    if (userPassword.length < 6) {
      err.userPassword = "Password must have more than 6 characters";
    }
    if (repeatPassword !== userPassword) {
      err.repeatPassword = "The password confirmation does not match";
    }
    if (Object.keys(err).length === 0) {
      register();
    }
    setMessageError(err);
  };

  return (
    <BasicLayout
      title="Welcome!"
      // description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox
            component="form"
            role="form"
            onSubmit={(e) => {
              e.preventDefault();
              validateInput();
            }}
          >
            <SuiBox mb={2}>
              <SuiInput
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </SuiBox>
            {messageError && (
              <p style={{ color: "red", fontSize: "15px" }}>{messageError.userName}</p>
            )}
            <SuiBox mb={2}>
              <SuiInput
                placeholder="Email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </SuiBox>
            {messageError && (
              <p style={{ color: "red", fontSize: "15px" }}>{messageError.userEmail}</p>
            )}
            <SuiBox mb={2}>
              <SuiInput
                type="number"
                placeholder="YearOfBirth"
                onChange={(e) => {
                  setUserYear(e.target.value);
                }}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </SuiBox>
            {messageError && (
              <p style={{ color: "red", fontSize: "15px" }}>{messageError.userPassword}</p>
            )}

            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </SuiBox>
            {messageError && (
              <p style={{ color: "red", fontSize: "15px" }}>{messageError.repeatPassword}</p>
            )}

            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton type="submit" variant="gradient" buttonColor="dark" fullWidth>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" textColor="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
