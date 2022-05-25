import React from "react";
import styled from "styled-components";
import { signInUser } from "../data/userData";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyle = styled.button`
  width: 200px;
  height: 100px;
  border-radius: 80px;
  font-size: 35px;
  background-color: #b2b1bf;
  opacity: 0.7;
  margin-top: 200px;
`;

export default function SignIn() {
  return (
    <Container>
        <ButtonStyle onClick={signInUser}>Sign In</ButtonStyle>
    </Container>
  );
}
