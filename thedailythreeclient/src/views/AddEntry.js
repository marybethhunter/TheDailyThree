import React from "react";
import AddEntryForm from "../components/AddEntryForm";

export default function AddEntry({ user }) {
  return (
    <>
      <AddEntryForm user={user} />
    </>
  );
}
