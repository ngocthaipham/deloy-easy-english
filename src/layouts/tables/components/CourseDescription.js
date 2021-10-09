import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import CourseRating from "./CourseRating";
import Comment from "./Comment";
import RatingList from "./RatingList";

const CourseDescription = () => {
  const { idSource } = useParams();
  const [nameSource, setNameSource] = useState();
  const [desSource, setDesSource] = useState();
  const [imageSource, setImageSource] = useState();
  const [countRating, setCountRating] = useState();
  const [countComment, setCountComment] = useState();
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const [cookies] = useCookies();

  useEffect(() => {
    Axios.get(`http://localhost:5000/source/${idSource}`).then((response) => {
      setNameSource(response.data.nameSource);
      setDesSource(response.data.desSource);
      setImageSource(response.data.imageSource);
      setCountRating(response.data.countRating);
      setCountComment(response.data.countComment);
    });
  }, [refresh]);

  const update = (res) => {
    setRefresh(res);
  };

  const addCourseFromExplore = () => {
    const data = {
      nameSource,
      desSource,
      imageSource,
      userName: cookies.userName,
    };

    Axios.post(`http://localhost:5000/explore/addCourse`, data).then(() => {});
  };
  const addLevelFromExplore = () => {
    Axios.post(`http://localhost:5000/explore/addLevel/${idSource}`, {
      userName: cookies.userName,
    }).then(() => {});
  };
  const addWordFromExplore = () => {
    Axios.post(`http://localhost:5000/explore/addWord/${idSource}`, {
      userName: cookies.userName,
    }).then((response) => {
      alert(response.data);
      history.push(`/home`);
    });
  };
  return (
    <>
      {cookies.userId ? (
        <div className="course-item-des-container">
          <DefaultProjectCard
            image={`http://localhost:5000/images/${imageSource}`}
            title={`${nameSource}`}
            description={`${desSource}`}
          />
          <div style={{ padding: "5px" }}>
            <SuiButton
              variant="outlined"
              size="small"
              buttonColor="info"
              onClick={() => {
                addCourseFromExplore();
                addLevelFromExplore();
                addWordFromExplore();
              }}
            >
              Study
            </SuiButton>
          </div>
          <CourseRating refreshState={refresh} updateRefreshState={update} />
          <div style={{ display: "flex" }}>
            <RatingList countRating={countRating} />
            <Comment
              countComment={countComment}
              refreshState={refresh}
              updateRefreshState={update}
            />
          </div>
        </div>
      ) : (
        <div className="course-item-des-container">
          <DefaultProjectCard
            image={`http://localhost:5000/images/${imageSource}`}
            title={`${nameSource}`}
            description={`${desSource}`}
          />

          <div style={{ display: "flex" }}>
            <div style={{ padding: "5px" }}>
              <SuiButton
                variant="outlined"
                size="small"
                buttonColor="info"
                onClick={() => {
                  history.push(`/authentication/sign-in`);
                }}
              >
                Study
              </SuiButton>
            </div>
            <RatingList countRating={countRating} />
            <Comment
              countComment={countComment}
              refreshState={refresh}
              updateRefreshState={update}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CourseDescription;
