import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Goal from "../components/Goal";
import styled from "styled-components";
import { getAllUserGoalsByUid } from "../data/goalData";

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

export default function Home({ user }) {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getAllUserGoalsByUid(user.uid).then((goalArray) => {
      if (isMounted) setGoals(goalArray);
    });
  }, []);

  return (
    <Container>
      <h1 style={{ opacity: 0.6 }}>{user.fullName}'s Goals</h1>
      <ButtonStyle
        className="submit-btn"
        onClick={() => navigate("/goals/addgoal")}
      >
        +
      </ButtonStyle>
      {goals.length === 0 && (
        <Wrapper
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h1>Add a goal to get started!</h1>
        </Wrapper>
      )}
      {goals.length !== 0 && (
          <Wrapper>
            {goals.map((goal) => (
              <Goal key={goal.id} goal={goal} />
            ))}
          </Wrapper>
        )}
    </Container>
  );
}
