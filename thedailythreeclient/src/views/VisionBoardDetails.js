import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  getSingleVisionBoard,
  getAllUserVisionBoardsByUid,
  deleteVisionBoard,
} from "../data/visionBoardData";
import { getAllVisionBoardImagesByVBId } from "../data/visionBoardImageData";
import VBImage from "../components/VBImage";
import AddEditVBImageForm from "../components/AddVBImageForm";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #b2b1bf;
  opacity: 0.76;
  width: 1000px;
  margin-top: 15px;
  border-radius: 75px;
  padding: 45px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ShowFormButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  font-size: 15px;
  background-color: #b2b1bf;
  opacity: 0.7;
`;

export default function VisionBoardDetails({ user }) {
  const [visionBoard, setVisionBoard] = useState({});
  const [visionBoardImages, setVisionBoardImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { vbKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleVisionBoard(vbKey).then((res) => {
        setVisionBoard(res);
      });
      getAllVisionBoardImagesByVBId(vbKey).then((res) => {
        setVisionBoardImages(res);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [visionBoardImages]);

  return (
    <Container style={{ marginBottom: 40, marginTop: 40 }}>
      <Wrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginRight: 15 }}>{visionBoard.title}</h3>
          <ShowFormButton
            className="submit-btn"
            onClick={() => setShowForm(true)}
          >
            +
          </ShowFormButton>
        </div>
        {showForm && (
          <AddEditVBImageForm vbId={vbKey} setShowForm={setShowForm} />
        )}
        <div
          style={{ marginBottom: 20, display: "flex", flexWrap: "wrap" }}
        >
          {visionBoardImages.map((vbImage) => (
            <VBImage vbImage={vbImage} key={vbImage.id} user={user} />
          ))}
        </div>
        <LinkWrapper>
          <Link
            onClick={() =>
              deleteVisionBoard(visionBoard.id, user.uid).then(
                getAllUserVisionBoardsByUid(user.uid)
              )
            }
            to="/visionboards"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
              </g>
            </svg>
          </Link>
          <Link to={`/visionboardedit/${vbKey}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
            </svg>
          </Link>
          <Link to="/visionboards">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 512 512"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M413,99a221.83,221.83,0,0,0-313-.76V49H70v105H175V124h-58.4A191.8,191.8,0,0,1,256,63.92c105.91,0,192.08,86.17,192.08,192.08S361.91,448.08,256,448.08,63.92,361.91,63.92,256H34A222,222,0,0,0,413,413a222,222,0,0,0,0-314Z" />
            </svg>
          </Link>
        </LinkWrapper>
      </Wrapper>
    </Container>
  );
}

VisionBoardDetails.propTypes = {
  visionBoard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }),
  visionBoardImages: PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    altText: PropTypes.string,
    visionBoardId: PropTypes.number,
  }),
};
