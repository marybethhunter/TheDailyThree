import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { getAllUserEntriesByUid } from "../data/entryData";
import Entry from "../components/Entry";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonStyle = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 35px;
  background-color: #b2b1bf;
  opacity: 0.7;
`;

const Wrapper = styled.div`
  background-color: #b2b1bf;
  opacity: 0.6;
  width: 600px;
  margin-top: 15px;
  border-radius: 75px;
  padding: 50px;
`;

export default function Home({ user }) {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getAllUserEntriesByUid(uid).then((entriesArray) => {
      if (isMounted) setEntries(entriesArray);
    });
  });

  //TODO: when getting user, make use of streak here in the h1

  return (
    <Container>
      <>
        {entries.length !== 0 && (
          <>
            <h1 style={{ opacity: 0.6 }}>{user.fullName}'s Entries</h1>
            <ButtonStyle
              className="submit-btn"
              onClick={() => navigate("/addentry")}
            >
              +
            </ButtonStyle>

            <Wrapper>
              {entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </Wrapper>
          </>
        )}
        {entries.length === 0 && (
          <Wrapper style={{ marginTop: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <h1>Add an entry to get started!</h1>
            <ButtonStyle
              className="submit-btn"
              onClick={() => navigate("/addentry")}
            >
              +
            </ButtonStyle>
          </Wrapper>
        )}
      </>
    </Container>
  );
}
