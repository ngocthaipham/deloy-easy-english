import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";

import "./ListLevel.css";

const ListLevel = () => {
  const [levelList, setLevelList] = useState([]);
  const { idSource } = useParams();
  const columns = [
    { name: "Level", align: "center" },
    { name: "Image", align: "center" },
    { name: "Action", align: "center" },
  ];

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/levels/${idSource}/page1`).then((response) => {
      setLevelList(
        response.data.result.map((level) => ({
          Level: level.level,
          Image: (
            <img
              className="level-image"
              style={{ height: "150px", width: "200px" }}
              src={`${process.env.REACT_APP_API_ENDPOINT}/images/${level.imageLevel}`}
              alt="a"
            />
          ),
          Action: (
            <div className="action-level-flex">
              <div className="action-level-item">
                <Link to={`/home/${idSource}/level/${level.idLevel}/${level.level}/word`}>
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    View
                  </SuiButton>
                </Link>
              </div>
              <div className="action-level-item">
                <Link to={`/home/${idSource}/level/${level.idLevel}/${level.level}/learn`}>
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    Learn
                  </SuiButton>
                </Link>
              </div>
              <div className="action-level-item">
                <Link
                  to={`/home/${idSource}/level/edit/${level.idLevel}/${level.level}/${level.imageLevel}`}
                >
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    Edit
                  </SuiButton>
                </Link>
              </div>
              <div className="action-level-item">
                <Link to={`/home/${idSource}/level/learned/${level.idLevel}/${level.level}`}>
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    Learned Word
                  </SuiButton>
                </Link>
              </div>

              <div className="action-level-item">
                <Link to={`/home/${idSource}/level/unlearned/${level.idLevel}/${level.level}`}>
                  <SuiButton variant="outlined" size="small" buttonColor="info">
                    Unlearned Word
                  </SuiButton>
                </Link>
              </div>
              <div className="action-level-item">
                <SuiButton variant="outlined" size="small" buttonColor="info">
                  Classic Review
                </SuiButton>
              </div>
              <div className="action-level-item">
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
        <div>
          <SuiButton
            component={Link}
            to={`/home/${idSource}/level/new`}
            variant="outlined"
            size="small"
            buttonColor="info"
          >
            Add a new level +
          </SuiButton>
        </div>
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Table columns={columns} rows={levelList} />
          </SuiBox>
        </SuiBox>
      </DashboardLayout>
    </>
  );
};
export default ListLevel;
