import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import SuiButton from "components/SuiButton";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Star from "assets/images/flaticon/star.png";
import LoadingHOCCollapse from "../../../LoadingHOCCollapse";
import "./Explore.css";

export const Explore = (props) => {
  const { setIsLoading } = props;
  const [courseList, setCourseList] = useState([]);
  const [favoriteCourseList, setFavoriteCourseList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourse, setTotalCourse] = useState();
  const [coursePerPage, setCoursePerPage] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token) {
      Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/favorites/${cookies.userName}`).then(
        (response) => {
          setFavoriteCourseList(response.data.result);
        }
      );
    }
  }, [isClicked]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sources/${0}/page${currentPage}`).then(
      (response) => {
        setCourseList(response.data.result);
        setTotalCourse(response.data.totalCourse);
        setCoursePerPage(response.data.coursePerPage);
        setIsLoading(false);
        console.log(response.data);
      }
    );
  }, [isClicked]);

  console.log(process.env.REACT_APP_API_ENDPOINT);

  const handleShowMorePosts = () => {
    setCurrentPage(currentPage + 1);
    setIsClicked(!isClicked);
  };
  function addToFavorite(id) {
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/favorite/${cookies.userName}`, {
      idSource: id,
    }).then((response) => {
      alert(response.data);
    });
    setIsClicked(!isClicked);
  }

  function removeFromFavorite(id) {
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/favorite/${cookies.userName}`, {
      idSource: id,
    }).then((response) => {
      alert(response.data);
    });
    setIsClicked(!isClicked);
  }

  return (
    <>
      <Card>
        <SuiBox p={2}>
          {!cookies.userId && (
            <div className="explore-container">
              {courseList.map((course) => (
                <div key={course.idSource} className="explore-item">
                  <div className="course-list-wrapper">
                    <Link to={`/explore/${course.idSource}`}>
                      <DefaultProjectCard
                        image={`${process.env.REACT_APP_API_ENDPOINT}/images/${course.imageSource}`}
                        title={`${course.nameSource}`}
                        description={`By ${course.userName}`}
                      />
                    </Link>
                    <div>
                      <div className="explore-des-flex">
                        <div className="explore-des-item">
                          <SuiTypography variant="body2" textColor="dark">
                            {course.likes} Like
                          </SuiTypography>
                          <SuiTypography variant="body2" textColor="dark">
                            {course.countRating} Rate
                          </SuiTypography>
                        </div>
                        <div className="explore-des-item">
                          <SuiTypography variant="body2" textColor="warning">
                            {course.star} <img style={{ height: "15px" }} src={Star} alt="star" />
                          </SuiTypography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cookies.userId && (
            <div className="explore-container">
              {courseList.map((course) =>
                favoriteCourseList.find(
                  (favoriteCourse) => favoriteCourse.idSource === course.idSource
                ) ? (
                  <div key={course.idSource} className="explore-item">
                    <div className="course-list-wrapper">
                      <Link to={`/explore/${course.idSource}`}>
                        <DefaultProjectCard
                          image={`${process.env.REACT_APP_API_ENDPOINT}/images/${course.imageSource}`}
                          title={`${course.nameSource}`}
                          description={`By ${course.userName}`}
                        />
                      </Link>
                      <div>
                        <SuiButton
                          variant="outlined"
                          size="small"
                          buttonColor="info"
                          onClick={() => {
                            removeFromFavorite(course.idSource);
                          }}
                        >
                          Remove from favorites
                        </SuiButton>
                        <div className="explore-des-flex">
                          <div className="explore-des-item">
                            <SuiTypography variant="body2" textColor="dark">
                              {course.likes} Like
                            </SuiTypography>
                            <SuiTypography variant="body2" textColor="dark">
                              {course.countRating} Rate
                            </SuiTypography>
                          </div>
                          <div className="explore-des-item">
                            <SuiTypography variant="body2" textColor="warning">
                              {course.star} <img style={{ height: "15px" }} src={Star} alt="star" />
                            </SuiTypography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="explore-item">
                    <div className="course-list-wrapper">
                      <Link to={`/explore/${course.idSource}`}>
                        <DefaultProjectCard
                          image={`${process.env.REACT_APP_API_ENDPOINT}/images/${course.imageSource}`}
                          title={`${course.nameSource}`}
                          description={`By ${course.userName}`}
                        />
                      </Link>
                      <div>
                        <SuiButton
                          variant="outlined"
                          size="small"
                          buttonColor="info"
                          onClick={() => {
                            addToFavorite(course.idSource);
                          }}
                        >
                          Add to favorites
                        </SuiButton>
                        <div className="explore-des-flex">
                          <div className="explore-des-item">
                            <SuiTypography variant="body2" textColor="dark">
                              {course.likes} Like
                            </SuiTypography>
                            <SuiTypography variant="body2" textColor="dark">
                              {course.countRating} Rate
                            </SuiTypography>
                          </div>
                          <div className="explore-des-item explore-des-2">
                            <SuiTypography variant="body2" textColor="warning">
                              {course.star} <img style={{ height: "15px" }} src={Star} alt="star" />
                            </SuiTypography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          {coursePerPage < totalCourse && (
            <div className="loadmore-btn">
              <SuiButton
                variant="outlined"
                size="small"
                buttonColor="info"
                onClick={handleShowMorePosts}
              >
                Load more
              </SuiButton>
            </div>
          )}
        </SuiBox>
      </Card>
    </>
  );
};
export default LoadingHOCCollapse(Explore);
