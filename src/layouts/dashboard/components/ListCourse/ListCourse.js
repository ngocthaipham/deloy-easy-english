import React, { useState, useEffect } from "react";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import LoadingHOCCollapse from "../../../../LoadingHOCCollapse.js"
import SetTarget from "./SetTarget.js";
import "./ListCourse.css";
import { Link, useHistory } from "react-router-dom";

export const ListCourse = (props) => {
  const [coursesList, setCourseList] = useState([]);
  const [onPageChange, setOnPageChange] = useState(false);
  const { setIsLoading } = props;
  const [cookies] = useCookies();
  const history = useHistory();
  if(!cookies.token) {
    history.push(`/authentication/sign-in`);
  }
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sources/${cookies.userName}/0/page1`).then(
      (response) => {
        setCourseList(response.data.result);
        setIsLoading(false);
      }
    );
  }, [onPageChange]);

  const addPrivateCourse = (id) => {
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/privateCourse/${id}`, { private: 1 }).then((response) => {
      setOnPageChange(!onPageChange);
    });
  };

  const removeCourse = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/sources/${id}`).then(() => {
      setCourseList(coursesList.filter((course) => course.idSource !== id));
    });
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {removeCourse(id)}
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
  };

  return (
    <>
      <div style={{ "padding-bottom": "10px" , display: "flex"}}>
        <div style={{marginRight: "10px"}}>
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
        <SetTarget />
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
                      onClick={()=> {addPrivateCourse(course.idSource)}}
                    >
                      Private
                    </SuiButton>
                  </div>
                  <div className="action-course-item">
                    <SuiButton
                      variant="outlined"
                      size="small"
                      buttonColor="error"
                      onClick={()=> {confirmDelete(course.idSource)}}
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
