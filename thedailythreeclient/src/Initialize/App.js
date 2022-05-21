import React, { useState } from "react";
import Routing from "../routes";
import Nav from "../components/Nav";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export default function App() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Body>
      <Nav expanded={expanded} setExpanded={setExpanded} />
      <Content>
        <Routing />
      </Content>
    </Body>
  );
}
