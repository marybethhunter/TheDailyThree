import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {
  getAllUserEntriesByUid,
  getMostRecentEntryByUid,
} from "../data/entryData";
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
  const [newestEntry, setNewestEntry] = useState({});
  const [canAddEntry, setCanAddEntry] = useState(false);
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getMostRecentEntryByUid(uid).then((entry) => {
      setNewestEntry(entry);
    });
    const currentDate = new Date().toDateString();
    getAllUserEntriesByUid(uid).then((entriesArray) => {
      if (isMounted) setEntries(entriesArray);
      if (
        entriesArray.length !== 0 &&
        newestEntry.date === currentDate.toString()
      ) {
        setCanAddEntry(false);
      }
      if (
        entriesArray.length !== 0 &&
        newestEntry.date !== currentDate.toString()
      ) {
        setCanAddEntry(true);
      } else if (entriesArray.length === 0) {
        setCanAddEntry(true);
      }
    });
  }, [canAddEntry, uid, entries.length]);

  //TODO: when getting user, make use of streak here in the h1

  return (
    <Container>
      {canAddEntry === true && (
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
          )
        </>
      )}
      {canAddEntry === true && (
        <>
          {" "}
          {entries.length === 0 && (
            <Wrapper
              style={{
                marginTop: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
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
      )}
      {canAddEntry === false && (
        <>
          <h1 style={{ opacity: 0.6 }}>{user.fullName}'s Entries</h1>
          <Wrapper>
            {entries.map((entry) => (
              <Entry key={entry.id} entry={entry} />
            ))}
          </Wrapper>
        </>
      )}
    </Container>
  );
}
