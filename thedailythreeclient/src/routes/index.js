import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import MoodTracker from "../views/MoodTracker";
import AddEntry from "../views/AddEntry";
import EntryDetails from "../views/EntryDetails";
import Goals from "../views/Goals";
import GoalDetails from "../views/GoalDetails";
import AddEditGoals from "../views/AddEditGoals";
import AddEditGoalForm from "../components/AddEditGoalForm";
import VisionBoards from "../views/VisionBoards";
import VisionBoardDetails from "../views/VisionBoardDetails";
import AddEditVisionBoard from "../views/AddEditVisionBoard";
import AddEditVBForm from "../components/AddEditVBForm";
export default function Routing({ user }) {
  return (
    <Routes>
      <Route
        user={user}
        exact
        path="/home/:uid"
        element={<Home user={user} />}
      />
      <Route
        user={user}
        exact
        path="/moodtracker"
        element={<MoodTracker user={user} />}
      />
      <Route
        user={user}
        exact
        path="/addentry"
        element={<AddEntry user={user} />}
      />
      <Route
        user={user}
        exact
        path="/details/:entryKey"
        element={<EntryDetails user={user} />}
      />
      <Route user={user} exact path="/goals" element={<Goals user={user} />} />
      <Route
        user={user}
        exact
        path="/goaldetails/:goalKey"
        element={<GoalDetails user={user} />}
      />
      <Route
        user={user}
        exact
        path="/goals/addgoal"
        element={<AddEditGoalForm user={user} />}
      />
      <Route
        user={user}
        exact
        path="/goalsedit/:goalEditKey"
        element={<AddEditGoals user={user} />}
      />
      <Route
        user={user}
        exact
        path="/visionboards"
        element={<VisionBoards user={user} />}
      />
      <Route
        user={user}
        exact
        path="/visionboarddetails/:vbKey"
        element={<VisionBoardDetails user={user} />}
      />
      <Route
        user={user}
        exact
        path="/visionboardedit/:vbEditKey"
        element={<AddEditVisionBoard user={user} />}
      />
      <Route
        user={user}
        exact
        path="/visionboards/add"
        element={<AddEditVBForm user={user} />}
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
