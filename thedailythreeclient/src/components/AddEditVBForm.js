import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";
import { getUserByUid } from "../data/userData";
import { addNewVisionBoard, updateVisionBoard } from "../data/visionBoardData";

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
  align-items: center;
  text-align: center;
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
};

export default function AddEditVBForm({ obj = {}, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        title: obj.title,
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
      updateVisionBoard(
        obj.id,
        { ...formInput, userId: verifiedUser.id, id: obj.id },
        user.uid
      ).then(() => {
        navigate(`/visionboarddetails/${obj.id}`);
      });
    } else {
      addNewVisionBoard({ ...formInput, userId: verifiedUser.id }).then(() => {
        resetForm();
        navigate("/visionboards");
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <h5>Please name your vision board :)</h5>
        <Form onSubmit={handleClick}>
          <FormGroupStyle>
            <Label for="title"></Label>
            <InputStyle
              onChange={(e) => handleChange(e)}
              value={formInput.title || ""}
              type="text"
              name="title"
              id="title"
              placeholder="Vision Board Title..."
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

AddEditVBForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }),
};

AddEditVBForm.defaultProps = {
  obj: {},
};
