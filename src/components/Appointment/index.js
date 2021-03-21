import React from 'react';
import "components/Appointment/styles.scss";

import Confirm from "./Confirm"
import Empty from "./Empty";
import Form from './Form';
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }

  function onCancel() {
    back()
  }

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function onConfirm() {
    transition(DELETING, true);
    props.cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
  }

  function onEdit() {
    transition(EDIT)
  }

  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && (
          <Empty onAdd={onAdd} />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={onSave}
          />
        )}
        {mode === SAVING && (
          <Status
            message="Saving"
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting"
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Delete the appointment?"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
        {mode === EDIT && (
          <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          />
        )}
      </article>
    </>
  )
}