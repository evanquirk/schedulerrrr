import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(dayObj => {

    return (
      <DayListItem 
        key={dayObj.id}
        name={dayObj.name} 
        spots={dayObj.spots} 
        selected={dayObj.id === props.value}
        setDay={(event) => props.onChange(dayObj.id)}  
        />
    )
  })
  return <ul>{schedule}</ul>
}