import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import MoodTracker from "../views/MoodTracker";
import AddEntry from "../views/AddEntry";
import EntryDetails from "../views/EntryDetails";

export default function Routing({ user }) {
  return (
    <Routes>
      <Route exact path="/home/:uid" element={<Home user={user} />} />
      <Route exact path="/moodtracker" element={<MoodTracker user={user} />} />
      <Route exact path="/addentry" element={<AddEntry user={user} />} />
      <Route
        exact
        path="/details/:entryKey"
        element={<EntryDetails user={user} />}
      />
    </Routes>
  );
}

Routing.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Routing.defaultProps = {
  user: null,
};
