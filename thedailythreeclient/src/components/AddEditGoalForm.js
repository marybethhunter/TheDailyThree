import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";
import { addNewGoal, updateGoal, getAllUserGoalsByUid } from "../data/goalData";
import { getUserByUid } from "../data/userData";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #b2b1bf;
  opacity: 0.7;
  width: 600px;
  margin-top: 15px;
  border-radius: 75px;
  padding: 50px;
  text-align: left;
`;

const FormGroupStyle = styled(FormGroup)`
  margin: 10px;
`;

const InputStyle = styled(Input)`
  background-color: #b2b1bf;
  border-radius: 5px;
  height: 20px;
  width: 400px;
`;

const ButtonStyle = styled(Button)`
  background-color: #b2b1bf;
  opacity: 0.7;
  border-radius: 5px;
  border: 1px solid black;
  height: 40px;
  width: 80px;
`;

const initialState = {
  title: "",
  description: "",
  completed: false,
};

export default function AddEditGoalForm({ obj = {}, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        title: obj.title,
        description: obj.description,
        completed: obj.completed,
      });
    }
    getUserByUid(user.uid).then(setVerifiedUser);
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateGoal(
        obj.id,
        { ...formInput, userId: verifiedUser.id, id: obj.id },
        user.uid
      ).then(() => {
        navigate(`/goaldetails/${obj.id}`);
      });
    } else {
      addNewGoal({ ...formInput, userId: verifiedUser.id }).then(() => {
        resetForm();
        navigate("/goals");
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <h5>
          Please complete the form with any goal you'd like to work towards
          accomplishing :)
        </h5>
        <Form onSubmit={handleClick}>
          <FormGroupStyle>
            <Label for="title"></Label>
            <InputStyle
              onChange={(e) => handleChange(e)}
              value={formInput.title || ""}
              type="text"
              name="title"
              id="title"
              placeholder="Goal Title..."
              required
            />
          </FormGroupStyle>
          <FormGroupStyle>
            <Label for="description"></Label>
            <InputStyle
              onChange={(e) => handleChange(e)}
              value={formInput.description || ""}
              type="textarea"
              name="description"
              id="description"
              placeholder="Description of goal..."
              required
            />
          </FormGroupStyle>
          <Container>
            <ButtonStyle type="submit" className="submit-btn">
              Submit
            </ButtonStyle>
          </Container>
        </Form>
      </Wrapper>
    </Container>
  );
}

AddEditGoalForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  }),
};

AddEditGoalForm.defaultProps = {
  obj: {},
};
