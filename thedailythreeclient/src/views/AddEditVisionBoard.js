import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import AddEditVBForm from "../components/AddEditVBForm";
import { getSingleVisionBoard } from "../data/visionBoardData";

export default function AddEditVisionBoard({ user }) {
  const [editVB, setEditVB] = useState({});
  const { vbEditKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleVisionBoard(vbEditKey).then((res) => {
        setEditVB(res);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AddEditVBForm obj={editVB} user={user} />
    </>
  );
}

AddEditVisionBoard.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AddEditVisionBoard.defaultProps = {
  user: null,
};
