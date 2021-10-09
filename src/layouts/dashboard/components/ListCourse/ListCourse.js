import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
// import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";
// import MenuIcon from "@mui/icons-material/Menu";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import styles from "layouts/dashboard/components/BuildByDevelopers/styles";
import "./ListCourse.css";
import { Link } from "react-router-dom";

const ListCourse = () => {
  const [coursesList, setCourseList] = useState([]);
  const [cookies] = useCookies();
  // const classes = styles();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sources/${cookies.userName}/0/page1`).then(
      (response) => {
        setCourseList(response.data.result);
      }
    );
  }, []);

  return (
    <>
      <div style={{ "padding-bottom": "10px" }}>
        <SuiButton
          component={Link}
          to="/home/course/new"
          variant="outlined"
          size="small"
          buttonColor="info"
        >
          Add a new course +
        </SuiButton>
      </div>
      <Card>
        <div className="card-flex">
          {coursesList.map((course) => (
            <div className="card-item" key={course.idSource}>
              <SuiBox p={2}>
                <DefaultProjectCard
                  image={`${process.env.REACT_APP_API_ENDPOINT}/images/${course.imageSource}`}
                  title={`${course.nameSource}`}
                  description={`${course.desSource}`}
                />
                <div className="action-course-flex">
                  <div className="action-course-item">
                    <SuiButton
                      component={Link}
                      to={`/home/${course.idSource}/level`}
                      variant="outlined"
                      size="small"
                      buttonColor="info"
                    >
                      View course
                    </SuiButton>
                  </div>
                  <div className="action-course-item">
                    <SuiButton
                      component={Link}
                      to={`/home/course/edit/${course.idSource}/${course.nameSource}/${course.desSource}/${course.imageSource}/0`}
                      variant="outlined"
                      size="small"
                      buttonColor="info"
                    >
                      Edit
                    </SuiButton>
                  </div>
                  <div className="action-course-item">
                    <SuiButton
                      component={Link}
                      to={`/home/${course.idSource}/level`}
                      variant="outlined"
                      size="small"
                      buttonColor="error"
                    >
                      Delete
                    </SuiButton>
                  </div>
                </div>
              </SuiBox>
            </div>
          ))}
        </div>
      </Card>
      {/* <Card key={course.idSource} sx={{ width: 1000, "z-index": 5 }}>
            <SuiBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <SuiBox display="flex" flexDirection="column" height="100%">
                    <SuiTypography variant="h5" fontWeight="bold" gutterBottom>
                      {course.nameSource}
                    </SuiTypography>
                    <SuiBox mb={6}>
                      <SuiTypography variant="body2" textColor="text">
                        {course.desSource}
                      </SuiTypography>
                    </SuiBox>
                    <SuiTypography
                      component="a"
                      href="#"
                      variant="button"
                      textColor="text"
                      fontWeight="medium"
                      customClass={classes.buildByDevelopers_button}
                    >
                      Read More
                      <Icon className="font-bold">arrow_forward</Icon>
                    </SuiTypography>
                  </SuiBox>
                </Grid>
                <Grid item xs={12} lg={5} className="ml-auto relative">
                  <div className="option-menu">
                    <span>
                      <MenuIcon className="font-bold" />
                    </span>
                    <div className="menu-list-container">
                      <button type="button" className="menu-item first-menu-item">
                        Add to private
                      </button>
                      <button type="button" className="menu-item">
                        Edit
                      </button>
                      <button type="button" className="menu-item last-menu-item">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div>
                    <Link to={`/dashboard/${course.idSource}/level`}>
                      <div>
                        <SuiBox
                          component="img"
                          src={`http://localhost:5000/images/${course.imageSource}`}
                          alt="source-image"
                          width="300px"
                          height="200px"
                          pt={3}
                        />
                      </div>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </SuiBox>
          </Card> */}
    </>
  );
};

export default ListCourse;
