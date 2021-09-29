import { useState } from "react";
// react-router-dom components
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./AddCourse.css";

const EditCourse = () => {
  const [newNameSource, setNewNameSource] = useState();
  const [newDesSource, setNewDesSource] = useState();
  const [newFileSelected, setNewFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState();
  const history = useHistory();
  const { idSource, nameSource, desSource, imageSource } = useParams();

  const handleEditCourse = () => {
    const data = new FormData();
    data.append("nameSource", newNameSource);
    data.append("desSource", newDesSource);
    data.append("imageSource", newFileSelected);
    data.append("private", 0);
    Axios.put(`http://localhost:5000/source/${idSource}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      history.push(`/dashboard`);
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
                Edit course
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
                      //   placeholder="New name course"
                      defaultValue={nameSource}
                      onChange={(e) => {
                        setNewNameSource(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      defaultValue={desSource}
                      onChange={(e) => {
                        setNewDesSource(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      style={{ display: "none" }}
                      type="file"
                      //   placeholder="Name course"
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
                        src={`http://localhost:5000/images/${imageSource}`}
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
export default EditCourse;
