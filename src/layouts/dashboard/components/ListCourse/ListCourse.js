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
// import ReactLoading from 'react-loading';
import LoadingHOCCollapse from "../../../../LoadingHOCCollapse.js"
// import styles from "layouts/dashboard/components/BuildByDevelopers/styles";
import "./ListCourse.css";
import { Link, useHistory } from "react-router-dom";

export const ListCourse = (props) => {
  const [coursesList, setCourseList] = useState([]);
  const { setIsLoading } = props;
  const [cookies] = useCookies();
  const history = useHistory();
  if(!cookies.token) {
    history.push(`/authentication/sign-in`);
  }
  // const classes = styles();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sources/${cookies.userName}/0/page1`).then(
      (response) => {
        setCourseList(response.data.result);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <div style={{ "padding-bottom": "10px" }}>
        <SuiButton
          component={Link}
          to="/my-course/course/new"
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
                      to={`/my-course/${course.idSource}/level`}
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
                      to={`/my-course/course/edit/${course.idSource}/${course.nameSource}/${course.desSource}/${course.imageSource}/0`}
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
                      to={`/my-course/${course.idSource}/level`}
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
    </>
  );
};

export default LoadingHOCCollapse(ListCourse);
