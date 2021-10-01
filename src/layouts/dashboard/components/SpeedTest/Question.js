/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import AudioImg from "assets/images/flaticon/sound.png";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import "./Question.css";

const Question = (props) => {
  const [wordList, setWordList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef();
  const timerRef = useRef();

  const { idLevel } = useParams();
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  const questionList = [];
  let audio = new Audio();
  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      shuffle(response.data);
      setWordList(response.data);
    });
  }, []);

  useEffect(() => {
    wordList.forEach((item, index) =>
      questionList.push({
        question: <p className="question-content">{item.meaning}</p>,
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[props.random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
        ]),
      })
    );
    wordList.forEach((item, index) =>
      questionList.push({
        question: (
          <img
            className="test-image"
            style={{ height: "500px", width: "750px" }}
            src={`http://localhost:5000/images/${item.imageWord}`}
            alt="speedtest"
          />
        ),
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[props.random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
        ]),
      })
    );
    wordList.forEach((item, index) =>
      questionList.push({
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
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[props.random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
        ]),
      })
    );
    shuffle(questionList);
    setQuestions(questionList);
  }, [wordList]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
      audio.autoplay = true;
      props.updateInCorrectTimes(props.inCorrectTimes + 1);
      setTimeout(() => {
        setCurrent(current + 1);
      }, 2000);
    }, 10000000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [current]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      props.updateTimeLearning(time);
      setTime(time + 1);
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [time]);

  function disabled() {
    if (clicked) {
      return true;
    }
    return false;
  }
  function onSelectedOption(optionSelected) {
    setClicked(true);
    setSelected(optionSelected);
  }

  function onCorrectOption() {
    props.updateScore(props.score + 1);
    audio = new Audio("http://localhost:5000/audios/right-answer.mp3");
    audio.play();
  }
  function onInCorrectOption() {
    props.updateInCorrectTimes(props.inCorrectTimes + 1);
    audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
    audio.play();
  }
  function onEndQuestion() {
    clearInterval(timerRef.current);
    props.learning();
    props.updateShowScore(true);
  }
  function nextQuestion() {
    setTimeout(() => {
      setCurrent(current + 1);
      setClicked(false);
      setSelected();
    }, 2000);
  }
  function color(option, optionSelected) {
    if (optionSelected === selected && option !== questions[current].answer) {
      return { backgroundColor: "red" };
    }
    if (clicked && option === questions[current].answer) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "white" };
  }
  function click(option, optionSelected) {
    onSelectedOption(optionSelected);
    if (option === questions[current].answer) {
      onCorrectOption();
    } else {
      onInCorrectOption();
    }
    if (current === questions.length - 1) {
      onEndQuestion();
    }
    nextQuestion();
  }

  return (
    <>
      <p>Time : {time}</p>
      {questions[current] && (
        <Card sx={{ "min-height": "550px", justifyContent: "center" }}>
          <div className="question-container">
            <p className="question">{questions[current].question}</p>
          </div>
        </Card>
      )}
      <br />
      <div className="answer-container">
        {questions[current] &&
          questions[current].options.map((option, index) => (
            <div className="answer" key={index}>
              <SuiBox>
                <Card sx={{ height: "80px", justifyContent: "center", margin: "0px 5px" }}>
                  <SuiButton
                    variant="text"
                    size="large"
                    buttonColor="dark"
                    type="button"
                    //   key={index}
                    style={color(option, index)}
                    disabled={disabled()}
                    className="answer"
                    onClick={() => {
                      click(questions[current].options[index], index);
                      clearInterval(intervalRef.current);
                    }}
                  >
                    {option}
                  </SuiButton>
                </Card>
              </SuiBox>
            </div>
          ))}
      </div>
    </>
  );
};

Question.propsTypes = {
  updateTimeLearning: PropTypes.func.isRequired,
  learning: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  updateShowScore: PropTypes.func.isRequired,
  random: PropTypes.func.isRequired,
  inCorrectTimes: PropTypes.number.isRequired,
  updateInCorrectTimes: PropTypes.func.isRequired,
};
export default Question;
