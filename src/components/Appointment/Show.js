import React from "react"
import "components/Appointment/styles.scss"

export default function Show (props) {
  const { student, interviewer: { name } } = props.interview;

  return (
  <main className="appointment__card appointment__card--show">
    <section className="appointment__card-left">
      <h2 className="text--regular">{student}</h2>
      <section className="interviewer">
        <h4 className="text--light">Interviewer</h4>
        <h3 className="text--regular">{name}</h3>
      </section>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <img
          className="appointment__actions-button"
          src="images/edit.png"
          alt="Edit"
          onClick={props.onEdit}
        />
        <img
          className="appointment__actions-button"
          src="images/trash.png"
          alt="Delete"
          onClick={props.onDelete}
        />
      </section>
    </section>
  </main>
  )
}