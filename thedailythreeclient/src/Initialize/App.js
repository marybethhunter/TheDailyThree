import React, { useState, useEffect } from "react";
import auth from "../data/apiKeys";
import Routing from "../routes";
import Nav from "../components/Nav";
import styled from "styled-components";
import backgroundImg from "../images/backgroundImage.jpg";
import { checkUserCreatedInDB } from "../data/userData";
import { useNavigate } from "react-router-dom";
import SignIn from "../views/SignIn";

const Body = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split("@")[0],
        };
        setUser(userObj);
        sessionStorage.setItem("token", authed.accessToken);
        checkUserCreatedInDB(authed.accessToken);
        navigate(`/home/${authed.uid}`);
      } else {
        setUser(null);
        sessionStorage.removeItem("token");
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <Body>
          <Nav expanded={expanded} setExpanded={setExpanded} user={user} />
          <Content>
            <Routing user={user} />
          </Content>
        </Body>
      ) : (
        <Body>
          <Nav expanded={expanded} setExpanded={setExpanded} user={user} />
          <Content>
            <SignIn />
          </Content>
        </Body>
      )}
    </>
  );
}
