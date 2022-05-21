import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addNewEntry } from '../data/entryData';
import { getAllMoods } from '../data/moodData';

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
    <>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Label for="thing1">1:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.thing1}
            type="text"
            name="thing1"
            id="thing1"
          />
        </FormGroup>
        <FormGroup>
          <Label for="thing2">2:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.thing2}
            type="text"
            name="thing2"
            id="thing2"
          />
        </FormGroup>
        <FormGroup>
          <Label for="thing3">3:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.thing3}
            type="text"
            name="thing3"
            id="thing3"
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Additional Comments:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.comment}
            type="textarea"
            name="comment"
            id="comment"
          />
        </FormGroup>
        <FormGroup tag="fieldset">
        <legend>How are you feeling today?</legend>
        {moods.map((mood) => (
          <FormGroup key={mood.id} check>
            <Label check for={`${mood.id}`}>
              <Input type="radio" name={`${mood.id}`} id={`${mood.id}`} onChange={(e) => handleChecked(e)} value={`${mood.id}`} />{' '}
              {mood.name}
            </Label>
          </FormGroup>
        ))}
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
