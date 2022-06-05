import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllUserVisionBoardsByUid } from "../data/visionBoardData";
import VisionBoard from "../components/VisionBoard";

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

export default function VisionBoards({ user }) {
  const [visionBoards, setVisionBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getAllUserVisionBoardsByUid(user.uid).then((vbArray) => {
      if (isMounted) setVisionBoards(vbArray);
    });
  }, []);

  return (
    <Container>
      <h1 style={{ opacity: 0.6 }}>{user.fullName}'s Vision Boards</h1>
      <ButtonStyle
        className="submit-btn"
        onClick={() => navigate("/visionboards/addvisionboard")}
      >
        +
      </ButtonStyle>
      {visionBoards.length === 0 && (
        <Wrapper
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h1>Add a vision board to get started!</h1>
        </Wrapper>
      )}
      {visionBoards.length !== 0 && (
          <Wrapper>
            {visionBoards.map((visionBoard) => (
              <VisionBoard key={visionBoard.id} visionBoard={visionBoard} />
            ))}
          </Wrapper>
        )}
    </Container>
  );
}
