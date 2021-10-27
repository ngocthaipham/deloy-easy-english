import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import SuiBox from "components/SuiBox";
import AudioImg from "assets/images/flaticon/sound.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiButton from "components/SuiButton";

const ClassicReview = () => {
  const [wordList, setWordList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState([]);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);

  const { idLevel } = useParams();

  const review = [];
  const questionList = [];
  let audio = new Audio();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/vocabs/${idLevel}`).then((response) => {
      setWordList(response.data);
    });
  }, []);

  useEffect(() => {
    wordList.forEach((item, index) => {
      questionList.push([
        shuffle([
          {
            id: item.id,
            question: <p className="question-content">{item.meaning}</p>,
            answer: item.vocab,
            options: shuffle([
              item.vocab,
              wordList[random(wordList.length / 3, 0, index)].vocab,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
            ]),
            correctSelectedPoint: 1,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <img
                className="test-image"
                style={{ height: "500px", width: "750px" }}
                src={`${process.env.REACT_APP_API_ENDPOINT}/images/${item.imageWord}`}
                alt="learn"
              />
            ),
            answer: item.vocab,
            options: shuffle([
              item.vocab,
              wordList[random(wordList.length / 3, 0, index)].vocab,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <div>
                <button
                  style={{ "background-color": "transparent", border: "none" }}
                  type="button"
                  onClick={() => {
                    const audios = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/${item.audioWord}`);
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
              wordList[random(wordList.length / 3, 0, index)].vocab,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
        ]),
        shuffle([
          {
            id: item.id,
            question: <p className="question-content">{item.vocab}</p>,
            answer: item.meaning,
            options: shuffle([
              item.meaning,
              wordList[random(wordList.length / 3, 0, index)].meaning,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].meaning,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].meaning,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <img
                className="test-image"
                style={{ height: "500px", width: "750px" }}
                src={`${process.env.REACT_APP_API_ENDPOINT}/images/${item.imageWord}`}
                alt="learn"
              />
            ),
            answer: item.meaning,
            options: shuffle([
              item.meaning,
              wordList[random(wordList.length / 3, 0, index)].meaning,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].meaning,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].meaning,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <div>
                <button
                  style={{ "background-color": "transparent", border: "none" }}
                  type="button"
                  onClick={() => {
                    const audios = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/${item.audioWord}`);
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
            answer: item.meaning,
            options: shuffle([
              item.meaning,
              wordList[random(wordList.length / 3, 0, index)].meaning,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].meaning,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].meaning,
            ]),
            correctSelectedPoint: 2,
            inCorrectSelectedPoint: -3,
            learning: item.learningPoint,
          },
        ]),
        shuffle([
          {
            id: item.id,
            question: <p className="question-content">{item.meaning}</p>,
            answer: item.vocab.toLowerCase(),
            correctSelectedPoint: 3,
            inCorrectSelectedPoint: -2.5,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <img
                className="test-image"
                style={{ height: "500px", width: "750px" }}
                src={`${process.env.REACT_APP_API_ENDPOINT}/images/${item.imageWord}`}
                alt="learn"
              />
            ),
            answer: item.vocab.toLowerCase(),
            correctSelectedPoint: 3,
            inCorrectSelectedPoint: -2.5,
            learning: item.learningPoint,
          },
          {
            id: item.id,
            question: (
              <div>
                <button
                  style={{ "background-color": "transparent", border: "none" }}
                  type="button"
                  onClick={() => {
                    const audios = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/${item.audioWord}`);
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
            learning: item.learningPoint,
          },
        ]),
      ]);
    });

    var questionListFlat = questionList.flat(1);
    const newQuestionList = [];
    for (let i = 0; i < questionListFlat.length - 1; i++) {
      newQuestionList.push(
        questionListFlat[i].concat(questionListFlat[i + 1], questionListFlat[i + 2])
      );
      i += 2;
    }
    for (let i = 0; i < newQuestionList.length * 9; i++) {
      var number = random(0, newQuestionList.length, newQuestionList.length);
      if (newQuestionList[number].length !== 0) {
        review.push(newQuestionList[number][0]);
        newQuestionList[number].shift();
      } else {
        var a = number;
        number = random(0, newQuestionList.length, a);
        i--;
      }
    }

    setQuestion(review);
  }, [wordList]);

  // console.log(question);
  function random(max, min, number) {
    var i = Math.floor(Math.random() * (max - min) + min);
    if (i === number) {
      return random(max, min, number);
    }
    return i;
  }
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  function disabled() {
    if (clicked) {
      return true;
    }
    return false;
  }
  function color(option, optionSelected) {
    if (optionSelected === selected && option !== question[currentQuestion].answer) {
      return { backgroundColor: "red" };
    }
    if (clicked && option === question[currentQuestion].answer) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "white" };
  }
  function click(option, optionSelected, id, correct, inCorrect) {
    setClicked(true);
    setSelected(optionSelected);
    if (option === question[currentQuestion].answer) {
      Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/updateLearningPoint/${id}`, {
        learningPoint: correct,
      });
      audio = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/right-answer.mp3`);
      audio.play();
    } else {
      Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/updateLearningPoint/${id}`, {
        learningPoint: inCorrect,
      });
      audio = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/wrong-answer.wav`);
      audio.play();
    }
    if (currentQuestion < question.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setClicked(false);
        setSelected();
      }, 2500);
    }
  }
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox pl={20} pr={20}>
          {question[currentQuestion] && question[currentQuestion].options && (
            // question[currentQuestion].learning < 10 &&
            <Card sx={{ "min-height": "550px", justifyContent: "center" }}>
              <div className="question-container">
                <p className="question">{question[currentQuestion].question}</p>
              </div>
            </Card>
          )}

          <br />
          <div className="answer-container">
            {question[currentQuestion] &&
              question[currentQuestion].options &&
            //   question[currentQuestion].learning < 10 &&
              question[currentQuestion].options.map((option, index) => (
                <div className="answer">
                  <SuiBox>
                    <Card sx={{ height: "80px", justifyContent: "center", margin: "0px 5px" }}>
                      <div className="answer-btn">
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
                          click(
                            question[currentQuestion].options[index],
                            index,
                            question[currentQuestion].id,
                            question[currentQuestion].correctSelectedPoint,
                            question[currentQuestion].inCorrectSelectedPoint
                          );
                        }}
                      >
                        {option}
                      </SuiButton>
                      </div>
                    </Card>
                  </SuiBox>
                </div>
              ))}
          </div>
          {/* {question[currentQuestion] &&
          question[currentQuestion].options &&
          question[currentQuestion].learning === 10 && skipQuestion()} */}
        </SuiBox>
        <SuiBox pl={20} pr={20}>
          {question[currentQuestion] && 
          !question[currentQuestion].options && 
            question[currentQuestion].learning === 10 && 
            (
            <div>
              <Card sx={{ "min-height": "550px", justifyContent: "center" }}>
                <div className="question-container">
                  <p className="question">{question[currentQuestion].question}</p>
                </div>
              </Card>
              <br />
              <div className="answer-container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    click(
                      answer,
                      0,
                      question[currentQuestion].id,
                      question[currentQuestion].correctSelectedPoint,
                      question[currentQuestion].inCorrectSelectedPoint
                    );
                    setTimeout(() => {
                      e.target.reset();
                    }, 2000);
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) => {
                      setAnswer(e.target.value.toLowerCase());
                    }}
                  />
                  <SuiButton
                    variant="text"
                    size="large"
                    buttonColor="dark"
                    type="submit"
                    //   key={index}
                    className="answer"
                  >
                    Submit Answer
                  </SuiButton>
                 
                </form>
              </div>
            </div>
          )}
        </SuiBox>
        {currentQuestion === question.length - 1 && <p>You have completed classic review</p>}
      </DashboardLayout>
    </>
  );
};
export default ClassicReview;
