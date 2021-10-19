import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
// import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";
// import Card from "@mui/material/Card";
import Question from "./Question";
// import ProgressBar from "./ProgressBar";
// import Heart from "./Heart";
import "./SpeedTest.css";

const SpeedReview = () => {
  const [score, setScore] = useState(0);
  const [isShowScore, setIsShowScore] = useState(false);
  const [inCorrectTimes, setInCorrectTimes] = useState(0);
  const [timeLearning, setTimeLearning] = useState(0);
  const [status, setStatus] = useState();
  const [cookies] = useCookies();

  const { idSource, idLevel, level } = useParams();
  const history = useHistory();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/status/${cookies.userName}`).then((response) =>
      setStatus(response.data)
    );
  }, [inCorrectTimes]);

  const random = (max, min, number) => {
    const i = Math.floor(Math.random() * (max - min) + min);
    if (i === number) {
      return random(max, min, number);
    }
    return i;
  };
  const updateScore = (res) => {
    setScore(res);
    // learning();
  };
  const updateShowScore = (res) => {
    setTimeout(() => {
      setIsShowScore(res);
    }, 3000);
  };

  const updateTimeLearning = (res) => {
    setTimeLearning(res);
  };

  const learning = () => {
    const data = {
      timeLearning,
      score,
    };
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/learning/${cookies.userName}`, data).then(() => {});
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/learning/${cookies.userName}`).then(() => {});
    setTimeout(() => {
      Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/userStreak/${cookies.userName}`).then(() => {});
    }, 2000);
  };
  const updateInCorrectTimes = (res) => {
    setTimeout(() => {
      setInCorrectTimes(res);
    }, 2000);
    if (inCorrectTimes === 2) {
      learning();
      setTimeout(() => {
        setIsShowScore(true);
      }, 2000);
    }
  };

  //   console.log(inCorrectTimes);
  return (
    <>
      {/* {inCorrectTimes === 0 && <Heart heart={"red-heart-icon"} secondHeart={"red-heart-icon"} />}
      {inCorrectTimes === 1 && <Heart heart={"red-heart-icon"} secondHeart={"white-heart-icon"} />}
      {inCorrectTimes === 2 && (
        <Heart heart={"white-heart-icon"} secondHeart={"white-heart-icon"} />
      )} */}
      <DashboardLayout>
        <DashboardNavbar />
        {isShowScore ? (
          // <Card>
          <div className="test-container">
            <SuiBox>
              <div className="score-wrapper">
                <p className="score-text">
                  You answer correct <p style={{ color: "red", fontSize: "40px" }}>{score}</p>
                  questions.
                </p>
                <br />
                {status && <p className="score-text">{status}</p>}
                <br />
                <button
                  type="button"
                  className="again-btn"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Again
                </button>
                <button
                  type="button"
                  className="go-back-btn"
                  onClick={() => {
                    history.push(`/my-course/${idSource}/level/${idLevel}/${level}/word`);
                  }}
                >
                  Back
                </button>
              </div>
            </SuiBox>
          </div>
        ) : (
          // </Card>
          // <Card sx={{ height: "880px" }}>
          <div className="test-container">
            <SuiBox pl={20} pr={20}>
              {/* <ProgressBar /> */}
              <Question
                updateTimeLearning={updateTimeLearning}
                learning={learning}
                updateScore={updateScore}
                score={score}
                updateShowScore={updateShowScore}
                random={random}
                inCorrectTimes={inCorrectTimes}
                updateInCorrectTimes={updateInCorrectTimes}
              />
            </SuiBox>
          </div>
          // </Card>
        )}
      </DashboardLayout>
    </>
  );
};
export default SpeedReview;
