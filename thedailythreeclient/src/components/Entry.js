import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Entry({ entry }) {
  return (
    <Wrapper>
      <h2>Date: {entry.date}</h2>
      <h2>Mood Id: {entry.moodId}</h2>
      <Link to={`/details/${entry.id}`}>Details</Link>
    </Wrapper>
  );
}

Entry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    thing1: PropTypes.string,
    thing2: PropTypes.string,
    thing3: PropTypes.string,
    comment: PropTypes.string,
    moodId: PropTypes.number,
    userId: PropTypes.number,
  }).isRequired,
};
