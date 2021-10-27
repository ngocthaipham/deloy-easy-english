import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { Link, useHistory } from "react-router-dom";
import LoadingHOCCollapse from "../../../LoadingHOCCollapse.js";

export const PrivateCourse = (props) => {
  const { setIsLoading } = props;
  const [coursesList, setCourseList] = useState([]);
  const [onPageChange, setOnPageChange] = useState(false);
  const [cookies] = useCookies();
  const history = useHistory();
  if(!cookies.token) {
    history.push(`/authentication/sign-in`);
  }

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sources/${cookies.userName}/1/page1`).then((response) => {
      setCourseList(response.data.result);
      setIsLoading(false);
    });
  }, [onPageChange]);
  const setPublicCourse = (id) => {
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/publicCourse/${id}`, { private: 0 }).then((response) => {
      setOnPageChange(!onPageChange);
    });
  };
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
                      variant="outlined"
                      size="small"
                      buttonColor="info"
                      onClick={()=> {setPublicCourse(course.idSource)}}
                    >
                      Public
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

export default LoadingHOCCollapse(PrivateCourse);
