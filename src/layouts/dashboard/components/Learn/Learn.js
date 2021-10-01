import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import SuiBox from "components/SuiBox";
import AudioImg from "assets/images/flaticon/sound.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiButton from "components/SuiButton";
import HardQuestion from "./HardQuestion";

const Learn = () => {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentQuestionGroup, setCurrentQuestionGroup] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState([]);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [learningPoint, setLearningPoint] = useState([]);
  const { idLevel } = useParams();

  const questionList = [];
  let audio = new Audio();

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  function random(max, min, number) {
    const i = Math.floor(Math.random() * (max - min) + min);
    if (i === number) {
      return random(max, min, number);
    }
    return i;
  }
  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      setWordList(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get(`http://localhost:5000/learningPoint/${idLevel}`).then((response) => {
      setLearningPoint(response.data);
    });
  }, [clicked]);

  function click(option, optionSelected, id, correct, inCorrect) {
    setClicked(true);
    setSelected(optionSelected);
    if (option === question[currentWord][currentQuestionGroup][currentQuestion].answer) {
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
    }
    if (currentQuestion < 2) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setClicked(false);
        setSelected();
      }, 2000);
    }
    if (currentQuestion === 2 && currentQuestionGroup < 1) {
      setTimeout(() => {
        setCurrentQuestion(0);
        setCurrentQuestionGroup(currentQuestionGroup + 1);
        setClicked(false);
        setSelected();
      }, 2000);
    }
    if (currentQuestionGroup === 1 && currentQuestion === 2) {
      setTimeout(() => {
        setCurrentWord(currentWord + 1);
        setCurrentQuestionGroup(0);
        setCurrentQuestion(0);
        setIsStarted(false);
        setClicked(false);
        setSelected();
      }, 2500);
    }
  }
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
            answer: item.vocab,
            options: shuffle([
              item.vocab,
              wordList[random(wordList.length / 3, 0, index)].vocab,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
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
            answer: item.vocab,
            options: shuffle([
              item.vocab,
              wordList[random(wordList.length / 3, 0, index)].vocab,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].vocab,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].vocab,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
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
            answer: item.meaning,
            options: shuffle([
              item.meaning,
              wordList[random(wordList.length / 3, 0, index)].meaning,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].meaning,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].meaning,
            ]),
            correctSelectedPoint: 1.5,
            inCorrectSelectedPoint: -3,
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
            answer: item.meaning,
            options: shuffle([
              item.meaning,
              wordList[random(wordList.length / 3, 0, index)].meaning,
              wordList[random((wordList.length / 3) * 2, wordList.length / 3, index)].meaning,
              wordList[random(wordList.length, (wordList.length / 3) * 2, index)].meaning,
            ]),
            correctSelectedPoint: 2,
            inCorrectSelectedPoint: -3,
          },
        ]),
      ]);
    });
    setQuestion(questionList);
  }, [wordList]);
  function disabled() {
    if (clicked) {
      return true;
    }
    return false;
  }
  function color(option, optionSelected) {
    if (
      optionSelected === selected &&
      option !== question[currentWord][currentQuestionGroup][currentQuestion].answer
    ) {
      return { backgroundColor: "red" };
    }
    if (clicked && option === question[currentWord][currentQuestionGroup][currentQuestion].answer) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "white" };
  }

  const start = () => {
    setIsStarted(true);
  };

  const updateCurrentWord = (res) => {
    setCurrentWord(res);
  };
  const updateStartState = (res) => {
    setIsStarted(res);
  };
  const updateLearningPoint = (res) => {
    setLearningPoint(res);
  };
  const updateClicked = (res) => {
    setClicked(res);
  };
  const updateQuestion = (res) => {
    setCurrentQuestion(res);
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {wordList[currentWord] && !isStarted && (
          <div className="test-container" style={{ textAlign: "center" }}>
            <SuiBox pl={20} pr={20}>
              <Card sx={{ "min-height": "600px", justifyContent: "center" }}>
                <div>
                  <p>{wordList[currentWord].vocab}</p>
                  <p>{wordList[currentWord].meaning}</p>

                  <img
                    className="test-image"
                    style={{ height: "500px", width: "750px" }}
                    src={`http://localhost:5000/images/${wordList[currentWord].imageWord}`}
                    alt="learn"
                  />
                  <div>
                    <button
                      style={{ "background-color": "transparent", border: "none" }}
                      type="button"
                      onClick={() => {
                        const audios = new Audio(
                          `http://localhost:5000/audios/${wordList[currentWord].audioWord}`
                        );
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
                  <SuiBox mt={3} pb={2}>
                    <SuiButton
                      variant="outlined"
                      size="small"
                      buttonColor="info"
                      onClick={() => {
                        start();
                      }}
                    >
                      Start
                    </SuiButton>
                  </SuiBox>
                </div>
              </Card>
            </SuiBox>
          </div>
        )}
        <SuiBox pl={20} pr={20}>
          {question[currentWord] && isStarted && learningPoint[currentWord].learningPoint < 10 && (
            <Card sx={{ "min-height": "550px", justifyContent: "center" }}>
              <div className="question-container">
                <p className="question">
                  {question[currentWord][currentQuestionGroup][currentQuestion].question}
                </p>
              </div>
            </Card>
          )}

          <br />
          <div className="answer-container">
            {question[currentWord] &&
              isStarted &&
              learningPoint[currentWord].learningPoint < 10 &&
              question[currentWord][currentQuestionGroup][currentQuestion].options.map(
                (option, index) => (
                  //   <button
                  //     type="button"
                  //     // key={index}
                  //     style={color(option, index)}
                  //     disabled={disabled()}
                  //     className="answer"
                  //     onClick={() => {
                  //       click(
                  //         question[currentWord][currentQuestionGroup][currentQuestion].options[index],
                  //         index,
                  //         question[currentWord][currentQuestionGroup][currentQuestion].id,
                  //         question[currentWord][currentQuestionGroup][currentQuestion]
                  //           .correctSelectedPoint,
                  //         question[currentWord][currentQuestionGroup][currentQuestion]
                  //           .inCorrectSelectedPoint
                  //       );
                  //     }}
                  //   >
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
                            click(
                              question[currentWord][currentQuestionGroup][currentQuestion].options[
                                index
                              ],
                              index,
                              question[currentWord][currentQuestionGroup][currentQuestion].id,
                              question[currentWord][currentQuestionGroup][currentQuestion]
                                .correctSelectedPoint,
                              question[currentWord][currentQuestionGroup][currentQuestion]
                                .inCorrectSelectedPoint
                            );
                          }}
                        >
                          {option}
                          {/* </button> */}
                        </SuiButton>
                      </Card>
                    </SuiBox>
                  </div>
                )
              )}
          </div>
        </SuiBox>
        <SuiBox pl={20} pr={20}>
          {learningPoint[currentWord] &&
            isStarted &&
            learningPoint[currentWord].learningPoint === 10 && (
              <div>
                <HardQuestion
                  shuffle={shuffle}
                  currentWord={currentWord}
                  updateCurrentWord={updateCurrentWord}
                  updateStartState={updateStartState}
                  updateLearningPoint={updateLearningPoint}
                  updateClicked={updateClicked}
                  updateQuestion={updateQuestion}
                />
              </div>
            )}
        </SuiBox>
      </DashboardLayout>
    </>
  );
};
export default Learn;
