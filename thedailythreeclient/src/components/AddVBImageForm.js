import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";
import { addNewVisionBoardImage } from "../data/visionBoardImageData";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #b2b1bf;
  opacity: 0.7;
  width: 600px;
  border-radius: 75px;
  text-align: left;
  margin-bottom: 20px;
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

const ShowFormButtonStyle = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  background-color: #b2b1bf;
  opacity: 0.7;
  padding-top: 5px;
`;

const initialState = {
  src: "",
  altText: "",
};

export default function AddEditVBImageForm({ vbId, setShowForm }) {
  const [formInput, setFormInput] = useState(initialState);

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
    addNewVisionBoardImage({
      ...formInput,
      visionBoardId: parseInt(vbId),
    }).then(() => {
      resetForm();
      setShowForm(false);
    });
  };

  return (
    <Container>
      <Wrapper>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <h4>Complete form to add new images to your vision board :)</h4>
          <ShowFormButtonStyle style={{ marginLeft: 15 }} className="submit-btn" onClick={() => setShowForm(false)}>^</ShowFormButtonStyle>
          <h6 style={{ marginLeft: 15 }} >(click to collapse)</h6>
        </div>
        <Form onSubmit={handleClick}>
          <FormGroupStyle>
            <Label for="src"></Label>
            <InputStyle
              onChange={(e) => handleChange(e)}
              value={formInput.src}
              type="text"
              name="src"
              id="src"
              placeholder="Vision Board Image Link..."
              required
            />
          </FormGroupStyle>
          <FormGroupStyle>
            <Label for="altText"></Label>
            <InputStyle
              onChange={(e) => handleChange(e)}
              value={formInput.altText}
              type="text"
              name="altText"
              id="altText"
              placeholder="Image Description..."
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
