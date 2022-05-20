import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addNewEntry } from '../data/entryData';

//TODO: add mood

const initialState = {
  thing1: '',
  thing2: '',
  thing3: '',
  comment: '',
};

//TODO: fix this hardcoded userId  once auth in place

export default function AddEntryForm() {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNewEntry({ ...formInput, date: new Date().toDateString(), userId: 1, moodId: 3 }).then(navigate('/'));
  };

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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
