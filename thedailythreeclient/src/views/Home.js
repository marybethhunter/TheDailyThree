import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserEntries } from "../data/entryData";
import Entry from "../components/Entry";

export default function Home() {
  const [entries, setEntries] = useState([]);
  //TODO: after auth setup: get userId dynamically, not hardcoded in state
  const [userId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getAllUserEntries(userId).then((entriesArray) => {
      if (isMounted) setEntries(entriesArray);
    });
  });

  //TODO: when getting user, make use of streak here in the h1

  return (
    <>
      {entries ? (
        <>
          <h1>Your Entries</h1>
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
          <button onClick={() => navigate('/addentry')}>Add Entry</button>
        </>
      ) : (
        <>
          <h2>You do not have any entries yet!</h2>
          <button onClick={() => navigate('/addentry')}>Add Entry</button>
        </>
      )}
    </>
  );
}
