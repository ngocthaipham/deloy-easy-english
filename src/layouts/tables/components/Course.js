import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import CourseDescription from "./CourseDescription";
import "./Course.css";

const Course = () => {
  const [courseItem, setCourseItem] = useState([]);

  const { idSource } = useParams();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/level/${idSource}`).then((response) => {
      setCourseItem(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Card>
          <SuiBox p={3}>
            <CourseDescription />
            <SuiBox>
              <div className="level-flex">
                {courseItem.map((item) => (
                  <div className="level-item" key={item.idLevel}>
                    <Link to={`/explore/${idSource}/${item.idLevel}`}>
                      <DefaultProjectCard
                        image={`${process.env.REACT_APP_API_ENDPOINT}/images/${item.imageLevel}`}
                        title={`${item.level}`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </SuiBox>
          </SuiBox>
        </Card>
      </DashboardLayout>
    </>
  );
};
export default Course;
