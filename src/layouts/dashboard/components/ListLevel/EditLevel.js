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
// import "./AddCourse.css";

const EditLevel = () => {
  const [newLevel, setNewLevel] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [cookies] = useCookies();
  const history = useHistory();
  const { idSource, idLevel, level, imageLevel } = useParams();

  const handleEditCourse = () => {
    const data = new FormData();
    data.append("level", newLevel);
    data.append("idSource", idSource);
    data.append("imageLevel", newFileSelected);
    data.append("userName", cookies.userName);
    Axios.put(`http://localhost:5000/level/${idLevel}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      history.push(`/home/${idSource}/level`);
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
                Edit level
              </SuiTypography>
              <SuiBox pt={2} pb={3} px={3}>
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditCourse();
                  }}
                >
                  <SuiBox mb={2}>
                    <SuiInput
                      defaultValue={level}
                      onChange={(e) => {
                        setNewLevel(e.target.value);
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
                        src={`http://localhost:5000/images/${imageLevel}`}
                        alt="preview"
                      />
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
export default EditLevel;
