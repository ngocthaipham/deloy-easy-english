import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import Table from "examples/Table";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./ListWord.css";
import AudioImg from "assets/images/flaticon/sound.png";

// import { useCookies } from "react-cookie";

const ListWord = () => {
  const [wordList, setWordList] = useState([]);
  const { idSource, idLevel, level } = useParams();
  const columns = [
    { name: "Word", align: "center" },
    { name: "Meaning", align: "center" },
    { name: "Image", align: "center" },
    { name: "Audio", align: "center" },
    { name: "Action", align: "center" },
  ];

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/words/${idLevel}`).then((response) => {
      console.log(response.data.result.idLevel);
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
          Action: (
            <div className="action-word-flex">
              <div className="action-word-item">
                <Link
                  to={`/home/${idSource}/level/${idLevel}/${level}/word/edit/${word.id}/${word.vocab}/${word.meaning}/${word.imageWord}/${word.audioWord}`}
                >
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    Edit
                  </SuiButton>
                </Link>
              </div>

              <div className="action-word-item">
                <SuiButton variant="outlined" size="small" buttonColor="error">
                  Delete
                </SuiButton>
              </div>
            </div>
          ),
        }))
      );
    });
  }, []);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <div className="word-btn-container">
          <div className="word-btn">
            <SuiButton
              component={Link}
              to={`/home/${idSource}/level/${idLevel}/${level}/word/new`}
              variant="outlined"
              size="small"
              buttonColor="info"
            >
              Add a new word +
            </SuiButton>
          </div>
          <div className="word-btn">
            <SuiButton
              pl={2}
              component={Link}
              to={`/home/${idSource}/level/${idLevel}/${level}/word/speedtest`}
              variant="outlined"
              size="small"
              buttonColor="info"
            >
              Speed test
            </SuiButton>
          </div>
        </div>
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Table columns={columns} rows={wordList} />
          </SuiBox>
        </SuiBox>
      </DashboardLayout>
    </>
  );
};
export default ListWord;
