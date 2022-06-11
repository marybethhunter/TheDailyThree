import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import {
  deleteEntry,
  getAllUserEntriesByUid,
  getSingleEntry,
} from "../data/entryData";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getSingleMood } from "../data/moodData";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #b2b1bf;
  opacity: 0.76;
  width: 600px;
  margin-top: 15px;
  border-radius: 75px;
  padding: 45px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export default function EntryDetails({ user }) {
  const [entry, setEntry] = useState({});
  const [mood, setMood] = useState({});
  const { entryKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleEntry(entryKey).then((res) => {
        setEntry(res);
        getSingleMood(res.moodId).then(setMood);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <h4>Entry Date: {entry.date}</h4>
        <h4>What you were grateful for:</h4>
        <ul>
          <li>{entry.thing1}</li>
          <li>{entry.thing2}</li>
          <li>{entry.thing3}</li>
        </ul>
        {entry.comment && (
          <>
            <h4>Comments: </h4>
            <ul>
              <li>{entry.comment}</li>
            </ul>
          </>
        )}
        <h4>Mood: {mood.name}</h4>
        <LinkWrapper>
          <Link
            onClick={() =>
              deleteEntry(entry.id, user.uid).then(() => {
                getAllUserEntriesByUid(user.uid);
              })
            }
            to={`/home/${user.uid}`}
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
          <Link to={`/home/${user.uid}`}>
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
  mood: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
