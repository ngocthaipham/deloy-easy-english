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

const EditWord = () => {
  const [newVocab, setNewVocab] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const [newAudioSelected, setNewAudioSelected] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [previewAudio, setPreviewAudio] = useState();

  const { idSource, idLevel, level, id, vocab, meaning, imageWord, audioWord } = useParams();
  const [cookies] = useCookies();
  const history = useHistory();

  const handleAddCourse = () => {
    const data = new FormData();
    data.append("idSource", idSource);
    data.append("idLevel", idLevel);
    data.append("level", level);
    data.append("vocab", newVocab);
    data.append("meaning", newMeaning);
    data.append("imageWord", newFileSelected);
    data.append("audioWord", newAudioSelected);
    data.append("userName", cookies.userName);
    Axios.put(`http://localhost:5000/word/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
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
                      defaultValue={vocab}
                      onChange={(e) => {
                        setNewVocab(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      defaultValue={meaning}
                      onChange={(e) => {
                        setNewMeaning(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => {
                        setNewFileSelected(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {newFileSelected ? (
                      <img className="preview-image" src={previewImage} alt="preview" />
                    ) : (
                      <img
                        className="preview-image"
                        src={`http://localhost:5000/images/${imageWord}`}
                        alt="preview"
                      />
                    )}
                    <SuiInput
                      style={{ display: "none" }}
                      type="file"
                      placeholder="Name course"
                      onChange={(e) => {
                        setNewAudioSelected(e.target.files[0]);
                        setPreviewAudio(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {newFileSelected ? (
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
                    ) : (
                      <button
                        style={{ "background-color": "transparent", border: "none" }}
                        type="button"
                        onClick={() => {
                          const audio = new Audio(`http://localhost:5000/audios/${audioWord}`);
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
                    )}
                  </SuiBox>
                  <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                    Save
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
export default EditWord;
