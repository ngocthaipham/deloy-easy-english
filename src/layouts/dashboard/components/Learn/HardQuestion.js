/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import AudioImg from "assets/images/flaticon/sound.png";

const HardQuestion = (props) => {
  const [wordList, setWordList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState();

  const { idLevel } = useParams();

  const questionList = [];
  let audio = new Audio();

  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      setWordList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5000/learningPoint/${idLevel}`).then((response) => {
      props.updateLearningPoint(response.data);
    });
  }, [props.clicked]);

  useEffect(() => {
    wordList.forEach((item) => {
      questionList.push([
        props.shuffle([
          {
            id: item.id,
            question: <p className="question-content">{item.meaning}</p>,
            answer: item.vocab.toLowerCase(),
            correctSelectedPoint: 3,
            inCorrectSelectedPoint: -2.5,
          },
          {
            id: item.id,
            question: (
              <img
                className="test-image"
                style={{ height: "500px", width: "750px" }}
                src={`http://localhost:5000/images/${item.imageWord}`}
                alt="learn"
              />
            ),
            answer: item.vocab.toLowerCase(),
            correctSelectedPoint: 3,
            inCorrectSelectedPoint: -2.5,
          },
          {
            id: item.id,
            question: (
              <div>
                <button
                  style={{ "background-color": "transparent", border: "none" }}
                  type="button"
                  onClick={() => {
                    const audios = new Audio(`http://localhost:5000/audios/${item.audioWord}`);
                    audios.play();
                  }}
                >
                  <SuiBox
                    className="audio-image"
                    component="img"
                    src={AudioImg}
                    alt="audio"
                    width="170px"
                    height="130px"
                    pt={3}
                  />
                </button>
              </div>
            ),
            answer: item.vocab.toLowerCase(),
            correctSelectedPoint: 3,
            inCorrectSelectedPoint: -2.5,
          },
        ]),
      ]);
    });
    setQuestion(questionList);
  }, [wordList]);
  function onSubmit(answerSubmit, id, correct, inCorrect) {
    setTimeout(() => {
      props.updateClicked(true);
    }, 2000);
    if (answer === answerSubmit) {
      Axios.put(`http://localhost:5000/updateLearningPoint/${id}`, {
        learningPoint: correct,
      });
      audio = new Audio("http://localhost:5000/audios/right-answer.mp3");
      audio.play();
    } else {
      Axios.put(`http://localhost:5000/updateLearningPoint/${id}`, {
        learningPoint: inCorrect,
      });
      audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
      audio.play();
      setTimeout(() => {
        setCurrentQuestion(0);
        props.updateClicked(false);
      }, 2000);
    }
    console.log(currentQuestion);
    if (currentQuestion < 2) {
      setTimeout(() => {
        props.updateClicked(false);
        setCurrentQuestion(currentQuestion + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        props.updateQuestion(0);
        props.updateClicked(false);
        props.updateCurrentWord(props.currentWord + 1);
        props.updateStartState(false);
        setCurrentQuestion(0);
      }, 2000);
    }
  }
  return (
    <>
      {question[props.currentWord] && (
        <div>
          <Card sx={{ "min-height": "550px", justifyContent: "center" }}>
            <div className="question-container">
              <p className="question">{question[props.currentWord][0][currentQuestion].question}</p>
            </div>
          </Card>
          <br />
          <div className="answer-container">
            <Card sx={{ height: "80px", width: "1259px", justifyContent: "center" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(
                    question[props.currentWord][0][currentQuestion].answer,
                    question[props.currentWord][0][currentQuestion].id,
                    question[props.currentWord][0][currentQuestion].correctSelectedPoint,
                    question[props.currentWord][0][currentQuestion].inCorrectSelectedPoint
                  );
                  setTimeout(() => {
                    e.target.reset();
                  }, 2000);
                }}
              >
                {/* <input
                  type="text"
                  onChange={(e) => {
                    setAnswer(e.target.value.toLowerCase());
                  }}
                /> */}
                <div style={{ display: "flex" }}>
                  <SuiInput
                    type="text"
                    placeholder="Answer"
                    onChange={(e) => {
                      setAnswer(e.target.value.toLowerCase());
                    }}
                  />
                  {/* <button className="btn" type="submit">
                    Submit Answer
                  </button> */}
                  <SuiButton type="submit" variant="outlined" size="small" buttonColor="info">
                    Submit Answer
                  </SuiButton>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
export default HardQuestion;
