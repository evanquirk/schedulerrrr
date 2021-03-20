export const getAppointmentsForDay = (state, day) => {

  const apptsThatDay = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {

      dayOfWeek.appointments.forEach((id) => {
        apptsThatDay.push(state.appointments[id])
      })
    }
  })
  return apptsThatDay.length ? apptsThatDay : [];
};

export function getInterview(state, interview) {
  console.log("STATE", state) 
  return !interview 
  ? null : {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
};
