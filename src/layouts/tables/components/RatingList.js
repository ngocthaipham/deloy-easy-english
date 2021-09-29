/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import SuiButton from "components/SuiButton";
import Star from "assets/images/flaticon/star.png";
import EmptyStar from "assets/images/flaticon/empty-star.png";
import "./Modal.css";

const RatingList = (props) => {
  const [ratingList, setRatingList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { idSource } = useParams();
  useEffect(() => {
    Axios.get(`http://localhost:5000/rating/${idSource}`).then((response) => {
      setRatingList(response.data);
    });
  }, [showModal]);
  if (!showModal) {
    return (
      //   <button
      //     type="button"
      //     className="btn"
      //     onClick={() => {
      //       setShowModal(true);
      //     }}
      //   >
      //     Rate ({props.countRating})
      //   </button>
      <div style={{ padding: "5px" }}>
        <SuiButton
          variant="outlined"
          size="small"
          buttonColor="info"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Rate ({props.countRating})
        </SuiButton>
      </div>
    );
  }
  return (
    <>
      {/* <button type="button" className="btn">
        Rate ({props.countRating})
      </button> */}
      <div style={{ padding: "5px" }}>
        <SuiButton variant="outlined" size="small" buttonColor="info">
          Rate ({props.countRating})
        </SuiButton>
      </div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Rate</h4>
          </div>
          {ratingList.map((rating) => (
            <p>
              {rating.byUser} :{" "}
              <Rating
                initialRating={rating.star}
                emptySymbol={<img style={{ fontSize: "32px" }} alt="rating" src={EmptyStar} />}
                fullSymbol={<img style={{ height: "32px" }} alt="rating" src={Star} />}
              />
            </p>
          ))}
          <div className="modal-footer">
            {/* <button
              type="button"
              className="modal-btn"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button> */}
            <SuiButton
              variant="outlined"
              size="small"
              buttonColor="error"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </SuiButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default RatingList;
