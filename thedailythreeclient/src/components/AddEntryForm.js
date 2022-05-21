import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addNewEntry } from '../data/entryData';
import styled from 'styled-components';
import { getAllMoods } from '../data/moodData';

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
  background-color:  #b2b1bf;
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
  thing1: '',
  thing2: '',
  thing3: '',
  comment: '',
};

//TODO: fix this hardcoded userId  once auth in place

export default function AddEntryForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState([]);
  const navigate = useNavigate();

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormInput(prevState => ({
      ...prevState,
      [name]: checked,
    }));
    if (e.target.checked === true) {
      const checkedMood = moods.find((mood) => mood.id === parseInt(e.target.id),
      );
      mood.push(checkedMood);
      setMood(mood);
    }
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getMoodId = (data) => {
    for (let key of Object.values(data)){
      return key;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const moodChosen = getMoodId(mood);
    addNewEntry({ ...formInput, date: new Date().toDateString(), userId: 1, moodId: moodChosen.id }).then(navigate('/home'));
  };

  useEffect(() => {
    let isMounted = true;
    getAllMoods().then((moodArray) => {
      if (isMounted) setMoods(moodArray);
    });
  }, [])

  return (
    <Container>
    <Wrapper>
      <h5>Please complete the form with three things you are grateful for today and your mood, along with any additional comments :)</h5>
      <Form onSubmit={handleClick}>
        <FormGroupStyle>
          <Label for="thing1"></Label>
          <InputStyle
            onChange={(e) => handleChange(e)}
            value={formInput.thing1}
            type="text"
            name="thing1"
            id="thing1"
            placeholder="What I'm grateful for..."
            required
          />
        </FormGroupStyle>
        <FormGroupStyle>
          <Label for="thing2"></Label>
          <InputStyle
            onChange={(e) => handleChange(e)}
            value={formInput.thing2}
            type="text"
            name="thing2"
            id="thing2"
            placeholder="What I'm grateful for..."
            required
          />
        </FormGroupStyle>
        <FormGroupStyle>
          <Label for="thing3"></Label>
          <InputStyle
            onChange={(e) => handleChange(e)}
            value={formInput.thing3}
            type="text"
            name="thing3"
            id="thing3"
            placeholder="What I'm grateful for..."
            required
          />
        </FormGroupStyle>
        <FormGroupStyle>
          <Label for="comment"></Label>
          <InputStyle
            onChange={(e) => handleChange(e)}
            value={formInput.comment}
            type="textarea"
            name="comment"
            id="comment"
            style={{ height: '200px' }}
            placeholder="Additional comments..."
          />
        </FormGroupStyle>
        <FormGroupStyle tag="fieldset">
        <legend>How are you feeling today?</legend>
        {moods.map((mood) => (
          <FormGroup key={mood.id} check>
            <Label check for={`${mood.id}`}>
              <Input type="radio" name={`${mood.id}`} id={`${mood.id}`} onChange={(e) => handleChecked(e)} value={`${mood.id}`} />{' '}
              {mood.name}
            </Label>
          </FormGroup>
        ))}
        </FormGroupStyle>
        <Container>
        <ButtonStyle type="submit" className="submit-btn">Submit</ButtonStyle>
        </Container>
      </Form>
    </Wrapper>
    </Container>
  );
}
