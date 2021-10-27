import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Axios from "axios";
import SuiButton from "components/SuiButton";
const SetTarget = () => {
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState();
  const [user, setUser] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${cookies.userName}`).then((response) => {
      setUser(response.data.result);
    });
  }, [showModal]);

  const submitTarget = (target) => {
    Axios.put(`${process.env.REACT_APP_API_ENDPOINT}/userTarget/${cookies.userName}`, {
      target: target,
    }).then((response) => {
      setShowModal(false);
    });
  };
  const submit = () => {
      setShowModal(true);
    confirmAlert({
      customUI: ({ onClose }) => {
          return (
            <form
            onSubmit={(e) => {
              e.preventDefault();
              submitTarget(target);
              onClose();
            }}
          >
          
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Set your daily target</h4>
                </div>
                <div className="modal-body">
                  {/* <div> */}
                    {user[0] && (
                      <p>Your current target : {user[0].target} scores/day</p>
                    )}
                  {/* </div> */}
                  <div className="modal-option">
                    <div className="modal-item">
                      <input
                        type="radio"
                        id="target1"
                        name="daily-target"
                        value="100"
                        onChange={(e) => {
                          setTarget(e.target.value);
                        }}
                      />
                      <p>100 scores/day</p>
                    </div>
                    <div className="modal-item">
                      <input
                        type="radio"
                        id="target2"
                        name="daily-target"
                        value="150"
                        onChange={(e) => {
                          setTarget(e.target.value);
                        }}
                      />
                      <p>150 scores/day</p>
                    </div>
                    <div className="modal-item">
                      <input
                        type="radio"
                        id="target3"
                        name="daily-target"
                        value="200"
                        onChange={(e) => {
                          setTarget(e.target.value);
                        }}
                      />
                      <p>200 scores/day</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div>
                    <button className="modal-btn" type="submit">
                      Save
                    </button>
                  </div>
                  <div>
                    <button
                      className="modal-btn"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          )
      },
      closeOnEscape: true,
  closeOnClickOutside: true,
    })}
  

  return (
    <>
        <SuiButton variant="outlined" size="small" buttonColor="info" onClick={submit}>
          Set Target
        </SuiButton>
    </>
  );
};
export default SetTarget;
