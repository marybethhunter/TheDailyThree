import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEntry from "../views/AddEntry";
import MoodTracker from "../views/MoodTracker";
import SignIn from "../views/SignIn";
import Home from "../views/Home";
import EntryDetails from "../views/EntryDetails";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/moodtracker" element={<MoodTracker />} />
      <Route exact path="/addentry" element={<AddEntry />} />
      <Route exact path="/details/:entryKey" element={<EntryDetails />} />
    </Routes>
  );
}
