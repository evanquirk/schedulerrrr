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
}

//returns an array
//returns an array with a length matching the number of appointments for that day
//returns an array containing the correct appointment objects
//returns an empty array when the days data is empty
//returns an empty array when the day is not found

