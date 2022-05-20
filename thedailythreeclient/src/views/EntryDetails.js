import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router";
import { deleteEntry, getSingleEntry } from "../data/entryData";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EntryDetails() {
  const [entry, setEntry] = useState({});
  const { entryKey } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleEntry(entryKey).then(setEntry);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Wrapper>
      <h2>Date: {entry.date}</h2>
      <h2>Gratitude 1: {entry.thing1}</h2>
      <h2>Gratitude 2: {entry.thing2}</h2>
      <h2>Gratitude 3: {entry.thing3}</h2>
      <h2>Comments: {entry.thing3}</h2>
      <h2>Mood Id: {entry.moodId}</h2>
      <button
        onClick={() => {
          deleteEntry(entry.id);
          navigate("/");
        }}
      >
        Delete Entry
      </button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </Wrapper>
  );
}

EntryDetails.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    thing1: PropTypes.string,
    thing2: PropTypes.string,
    thing3: PropTypes.string,
    comment: PropTypes.string,
    moodId: PropTypes.number,
    userId: PropTypes.number,
  }),
};
