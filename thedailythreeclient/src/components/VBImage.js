import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  opacity: 0.8;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

export default function VBImage({ vbImage }) {
  return (
    <Container className="vb-image">
      <Image src={vbImage.src} alt={vbImage.altText} />
    </Container>
  )
}

VBImage.propTypes = {
  vbImage: PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    altText: PropTypes.string,
    visionBoardId: PropTypes.number,
  }).isRequired,
};
