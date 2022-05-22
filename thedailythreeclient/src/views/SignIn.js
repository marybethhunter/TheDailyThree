import React from 'react';
import styled from 'styled-components';

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
  margin-top: 100px;
`;

//TODO: Add auth/onClick to this button
//TODO: hide nav when on this view i.e. when there is no user, hide nav

export default function SignIn() {
  return (
    <Container>
      <ButtonStyle>Sign In</ButtonStyle>
    </Container>
  )
};
