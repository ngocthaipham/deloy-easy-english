import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import SuiBox from "components/SuiBox";
import AudioImg from "assets/images/flaticon/sound.png";
import Table from "examples/Table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const UnLearnedWord = () => {
  const [wordList, setWordList] = useState([]);
  const { idLevel } = useParams();
  const columns = [
    { name: "Word", align: "center" },
    { name: "Meaning", align: "center" },
    { name: "Image", align: "center" },
    { name: "Audio", align: "center" },
  ];

  useEffect(() => {
    Axios.get(`https://server-easyenglish.herokuapp.com//vocabsLearn/${idLevel}/0`).then((response) => {
      setWordList(
        response.data.result.map((word) => ({
          Word: word.vocab,
          Meaning: word.meaning,
          Image: (
            <img
              className="word-image"
              style={{ height: "150px", width: "200px" }}
              src={`https://server-easyenglish.herokuapp.com//images/${word.imageWord}`}
              alt="a"
            />
          ),
          Audio: (
            <button
              style={{ "background-color": "transparent", border: "none" }}
              type="button"
              onClick={() => {
                const audio = new Audio(`https://server-easyenglish.herokuapp.com//audios/${word.audioWord}`);
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
        }))
      );
    });
  }, []);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Table columns={columns} rows={wordList} />
          </SuiBox>
        </SuiBox>
      </DashboardLayout>
    </>
  );
};
export default UnLearnedWord;
