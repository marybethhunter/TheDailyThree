import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AddEditGoalForm from '../components/AddEditGoalForm';
import { getSingleGoal } from '../data/goalData';

export default function AddEditGoals({ user }) {
  const [editPost, setEditPost] = useState({});
  const { goalEditKey } = useParams(); 

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleGoal(goalEditKey).then((res) => {
        setEditPost(res);
      });
    }
    console.log(editPost);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AddEditGoalForm obj={editPost} user={user} />
    </>
  )
}

AddEditGoals.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AddEditGoals.defaultProps = {
  user: null,
};
