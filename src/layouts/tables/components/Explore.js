import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import SuiButton from "components/SuiButton";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import "./Explore.css";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [favoriteCourseList, setFavoriteCourseList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourse, setTotalCourse] = useState();
  const [coursePerPage, setCoursePerPage] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    Axios.get(`http://localhost:5000/favorites/${cookies.userName}`).then((response) => {
      setFavoriteCourseList(response.data.result);
    });
  }, [isClicked]);
  useEffect(() => {
    Axios.get(`http://localhost:5000/sources/${0}/page${currentPage}`).then((response) => {
      setCourseList(response.data.result);
      setTotalCourse(response.data.totalCourse);
      setCoursePerPage(response.data.coursePerPage);
      console.log(response.data);
    });
  }, [isClicked]);

  const handleShowMorePosts = () => {
    setCurrentPage(currentPage + 1);
    setIsClicked(!isClicked);
  };
  function addToFavorite(id) {
    Axios.post(`http://localhost:5000/favorite/${cookies.userName}`, {
      idSource: id,
    }).then((response) => {
      alert(response.data);
    });
    setIsClicked(!isClicked);
  }

  function removeFromFavorite(id) {
    Axios.put(`http://localhost:5000/favorite/${cookies.userName}`, {
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
          <div className="explore-container">
            {courseList.map((course) =>
              favoriteCourseList.find(
                (favoriteCourse) => favoriteCourse.idSource === course.idSource
              ) ? (
                <div key={course.idSource} className="explore-item">
                  <div className="course-list-wrapper">
                    <Link to={`/tables/${course.idSource}`}>
                      <DefaultProjectCard
                        image={`http://localhost:5000/images/${course.imageSource}`}
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
                            {course.star}
                          </SuiTypography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="explore-item">
                  <div className="course-list-wrapper">
                    <Link to={`/tables/${course.idSource}`}>
                      <DefaultProjectCard
                        image={`http://localhost:5000/images/${course.imageSource}`}
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
                            {course.star}
                          </SuiTypography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
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
export default Explore;
