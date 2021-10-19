import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Axios from "axios";
import LoadingHOCCollapse from "../../../LoadingHOCCollapse.js"

export const FavoriteCourse = (props) => {
  const { setIsLoading } = props;
  const [favoriteCourse, setFavoriteCourse] = useState([]);
  const [cookies] = useCookies();
  const history = useHistory();
  if(!cookies.token) {
    history.push(`/authentication/sign-in`);
  }

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/favorites/${cookies.userName}`).then((response) => {
      setFavoriteCourse(response.data.result);
      setIsLoading(false);
    });
  }, []);

  function removeFromFavorite(id) {
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/favorite/${cookies.userName}`, {
      idSource: id,
    }).then((response) => {
      alert(response.data);
      setFavoriteCourse(favoriteCourse.filter((course) => course.idSource !== id));
    });
  }
  return (
    <>
      <Card>
        <div className="card-flex">
          {favoriteCourse.map((course) => (
            <div className="card-item" key={course.idSource}>
              <SuiBox p={2}>
                <DefaultProjectCard
                  image={`${process.env.REACT_APP_API_ENDPOINT}/images/${course.imageFavoriteCourse}`}
                  title={`${course.nameFavoriteCourse}`}
                  description={`${course.desFavoriteCourse}`}
                />
                <div className="action-course-flex">
                  <div className="action-course-item">
                    <SuiButton
                      component={Link}
                      to={`/tables/${course.idSource}`}
                      variant="outlined"
                      size="small"
                      buttonColor="info"
                    >
                      View course
                    </SuiButton>
                  </div>
                  <div className="action-course-item">
                    <SuiButton
                      onClick={() => {
                        removeFromFavorite(course.idSource);
                      }}
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
export default LoadingHOCCollapse(FavoriteCourse);
