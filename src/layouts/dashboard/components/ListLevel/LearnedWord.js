import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import SuiBox from "components/SuiBox";
import AudioImg from "assets/images/flaticon/sound.png";
import Table from "examples/Table";
import LoadingHOC from "../../../../LoadingHOC.js";


export const LearnedWord = (props) => {
  const { setIsLoading } = props;
  const [wordList, setWordList] = useState([]);
  const { idLevel } = useParams();
  const columns = [
    { name: "Word", align: "center" },
    { name: "Meaning", align: "center" },
    { name: "Image", align: "center" },
    { name: "Audio", align: "center" },
    { name: "Point", align: "center" },
  ];

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/vocabsLearn/${idLevel}/1`).then((response) => {
      setWordList(
        response.data.result.map((word) => ({
          Word: word.vocab,
          Meaning: word.meaning,
          Image: (
            <img
              className="word-image"
              style={{ height: "150px", width: "200px" }}
              src={`${process.env.REACT_APP_API_ENDPOINT}/images/${word.imageWord}`}
              alt="a"
            />
          ),
          Audio: (
            <button
              style={{ "background-color": "transparent", border: "none" }}
              type="button"
              onClick={() => {
                const audio = new Audio(`${process.env.REACT_APP_API_ENDPOINT}/audios/${word.audioWord}`);
                audio.play();
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
          ),
          Point: <p>{word.learningPoint}</p>,
        }))
      );
      setIsLoading(false);
    });
  }, []);
  return (
    <>
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Table columns={columns} rows={wordList} />
          </SuiBox>
        </SuiBox>
    </>
  );
};
export default LoadingHOC(LearnedWord);
