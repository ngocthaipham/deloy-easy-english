/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Rating from "react-rating";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Star from "assets/images/flaticon/star.png";
import EmptyStar from "assets/images/flaticon/empty-star.png";

const CourseRating = (props) => {
  const [rating, setRating] = useState(0);
  const { idSource } = useParams();
  const [cookies] = useCookies();

  const ratingCourse = (rate) => {
    setRating(rate);
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/rating/${idSource}`, {
      star: rate,
      byUser: cookies.userName,
    }).then((response) => {
      alert(response.data);
    });
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/putRating/${idSource}`).then((response) => {
      alert(response.data);
      props.updateRefreshState(!props.refreshState);
    });
  };

  return (
    <>
      <div style={{ "padding-top": "10px" }}>
        <Rating
          initialRating={rating}
          fractions={2}
          emptySymbol={<img style={{ height: "32px" }} alt="rating" src={EmptyStar} />}
          fullSymbol={<img style={{ height: "32px" }} alt="rating" src={Star} />}
          onClick={(rate) => ratingCourse(rate)}
        />
      </div>
    </>
  );
};
export default CourseRating;
