import { useState } from "react";
// react-router-dom components
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./AddCourse.css";

const AddCourse = () => {
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:5000/images/image1627300361179.jpg"
  );
  const [cookies] = useCookies();
  const history = useHistory();

  const handleAddCourse = () => {
    const data = new FormData();
    data.append("nameSource", nameSource);
    data.append("desSource", desSource);
    data.append("userName", cookies.userName);
    data.append("imageSource", fileSelected);
    Axios.post(`http://localhost:5000/source`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
      history.push(`/home`);
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
                New course
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
                      placeholder="Name course"
                      onChange={(e) => {
                        setNameSource(e.target.value);
                      }}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput
                      placeholder="Description course"
                      onChange={(e) => {
                        setDesSource(e.target.value);
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
export default AddCourse;
