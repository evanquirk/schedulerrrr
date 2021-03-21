import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });
  const setDay = day => setState({ ...state, day });

  function updateSpots(newAppointments) {
    return state.days.map((day, index) => {
      let freeSpots = 0;
      for (let key of state.days[index].appointments) {
        if (newAppointments[key].interview === null) {
          freeSpots++
        }
      };
      const newDay = { ...day, spots: freeSpots }
      return newDay;
    })
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          }
          const days = updateSpots(appointments)

          setState({
            ...state,
            appointments,
            days
          })
        }
      }).catch(error => {
        throw new Error(error)
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: null
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };

          const days = updateSpots(appointments)

          setState({
            ...state,
            appointments,
            days
          })
        }
      }).catch(error => {
        throw new Error(error)
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, [])

  useEffect(() => {
    console.log(state.appointments[1])
    console.log(state.days)
  }, [state.appointments])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}

