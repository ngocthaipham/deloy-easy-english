/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import SuiButton from "components/SuiButton";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const Comment = (props) => {
  const { idSource } = useParams();
  const [commentList, setCommentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState();
  const [submittedComment, setSubmittedComment] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    Axios.get(`http://localhost:5000/getComment/${idSource}`).then((response) => {
      setCommentList(response.data);
    });
  }, [submittedComment]);

  const sendComment = () => {
    Axios.post(`http://localhost:5000/comment/${idSource}`, {
      comment,
      byUser: cookies.userName,
    }).then((response) => {
      alert(response.data);
      setSubmittedComment(!submittedComment);
      props.updateRefreshState(!props.refreshState);
    });
  };
  if (!showModal) {
    return (
      //   <button
      //     type="button"
      //     className="btn"
      //     onClick={() => {
      //       setShowModal(true);
      //     }}
      //   >
      //     Comment ({props.countComment})
      //   </button>
      <div style={{ padding: "5px" }}>
        <SuiButton
          variant="outlined"
          size="small"
          buttonColor="info"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Comment ({props.countComment})
        </SuiButton>
      </div>
    );
  }
  return (
    <>
      {/* <button type="button" className="btn">
        Comment ({props.countComment})
      </button> */}
      <div style={{ padding: "5px" }}>
        <SuiButton variant="outlined" size="small" buttonColor="info">
          Comment ({props.countComment})
        </SuiButton>
      </div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Comment</h4>
          </div>
          {/* <div className="modal-body"></div> */}
          {commentList.map((comments) => (
            <p key={comments.idComment}>
              {comments.byUser} : {comments.comment}
              <br />
            </p>
          ))}
          <br />
          <p style={{ fontSize: "17px" }}>Write comment : </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendComment();
              e.target.reset();
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {/* <button type="submit">Send</button> */}
            <SuiButton type="submit" variant="outlined" size="small" buttonColor="info">
              Send
            </SuiButton>
          </form>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="modal-btn"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button> */}
            <SuiButton
              variant="outlined"
              size="small"
              buttonColor="error"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </SuiButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
