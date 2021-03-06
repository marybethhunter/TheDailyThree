import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import PropTypes from "prop-types";
import { signOutUser } from "../data/userData";

const NavContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  height: 100vh;
  border-right: 2px solid black;
  background-color: #b2b1bf;
  opacity: 0.55;
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  gap: 20px;
  margin-top: 90px;
  border-top: 5px double black;
`;

const NavLink = styled.div`
  font-size: 120%;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    font-size: 130%;
  }
`;

const NavHeader = styled.div`
  font-size: 140%;
  white-space: nowrap;
  text-decoration: underline;
  margin: 10px 0px;
`;

export default function Nav({ expanded, setExpanded, user }) {
  const navigate = useNavigate();

  const navTo = (pathname) => {
    navigate(`/${pathname.toLowerCase()}`);
  };

  return (
    <NavContainer>
      <NavIcon expanded={expanded} setExpanded={setExpanded} />
      <NavContent
        className={expanded ? "navContent-expanded" : "navContent-hidden"}
      >
        <NavHeader className={expanded ? "nav-expanded" : "nav-hidden"}>
          The Daily Three
        </NavHeader>
        {user && (
          <>
            <NavLink
              onClick={() => navigate(`/home/${user.uid}`)}
              className={expanded ? "nav-expanded" : "nav-hidden"}
            >
              Your Entries
            </NavLink>
            <NavLink
              onClick={() => navTo("MoodTracker")}
              className={expanded ? "nav-expanded" : "nav-hidden"}
            >
              Mood Tracker
            </NavLink>
            <NavLink
              onClick={() => navTo("Goals")}
              className={expanded ? "nav-expanded" : "nav-hidden"}
            >
              Goals
            </NavLink>
            <NavLink
              onClick={() => navTo("visionBoards")}
              className={expanded ? "nav-expanded" : "nav-hidden"}
            >
              Vision Boards
            </NavLink>
            <NavLink
              onClick={() => signOutUser().then(() => navigate("/"))}
              className={expanded ? "nav-expanded" : "nav-hidden"}
            >
              Sign Out
            </NavLink>
          </>
        )}
      </NavContent>
    </NavContainer>
  );
}

Nav.propTypes = {
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
