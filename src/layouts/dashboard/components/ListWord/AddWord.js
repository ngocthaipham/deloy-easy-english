import { useState } from "react";
// react-router-dom components
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AudioImg from "assets/images/flaticon/sound.png";

const AddWord = () => {
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [audioSelected, setAudioSelected] = useState();
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:5000/images/image1627300361179.jpg"
  );
  const [previewAudio, setPreviewAudio] = useState();
  const [cookies] = useCookies();
  const history = useHistory();
  const { idSource, idLevel, level } = useParams();

  const handleAddCourse = () => {
    const data = new FormData();
    data.append("idSource", idSource);
    data.append("idLevel", idLevel);
    data.append("level", level);
    data.append("vocab", vocab);
    data.append("meaning", meaning);
    data.append("imageWord", fileSelected);
    data.append("audioWord", audioSelected);
    data.append("userName", cookies.userName);
    Axios.post(`http://localhost:5000/word`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
      setPreviewAudio();
      history.push(`/home/${idSource}/level/${idLevel}/${level}/word`);
    });
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Card>
          <div className="add-course-wrapper">
            <div className="add-course-container">
              <SuiTypography textColor="info" fontWeight="bold">
                New word
              </SuiTypography>
              <SuiBox pt={2} pb={3} px={3}>
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCourse();
                  }}
                >
                  <SuiBox mb={2}>
                    <SuiInput
                      placeholder="Vocabulary"
                      onChange={(e) => {
                        setVocab(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      placeholder="Meaning"
                      onChange={(e) => {
                        setMeaning(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      style={{ display: "none" }}
                      type="file"
                      placeholder="Name course"
                      onChange={(e) => {
                        setFileSelected(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    <img className="preview-image" src={previewImage} alt="preview" />
                    <SuiInput
                      style={{ display: "none" }}
                      type="file"
                      placeholder="Name course"
                      onChange={(e) => {
                        setAudioSelected(e.target.files[0]);
                        setPreviewAudio(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    <button
                      style={{ "background-color": "transparent", border: "none" }}
                      type="button"
                      onClick={() => {
                        const audio = new Audio(previewAudio);
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
                  </SuiBox>
                  <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                    Creat
                  </SuiButton>
                </form>
              </SuiBox>
            </div>
          </div>
        </Card>
      </DashboardLayout>
    </>
  );
};
export default AddWord;
