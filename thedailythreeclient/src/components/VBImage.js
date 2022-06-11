import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { deleteVisionBoardImage } from "../data/visionBoardImageData";

const Container = styled.div`
  display: flex;
  opacity: 0.8;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

export default function VBImage({ vbImage, user }) {
  return (
    <Container className="vb-image svg-overlay-wrap">
      <Image src={vbImage.src} alt={vbImage.altText} />
      <Link
        className="link"
        onClick={() => deleteVisionBoardImage(vbImage.id, user.uid)}
        to={`/visionboarddetails/${vbImage.visionBoardId}`}
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
    </Container>
  );
}

VBImage.propTypes = {
  vbImage: PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    altText: PropTypes.string,
    visionBoardId: PropTypes.number,
  }).isRequired,
};
