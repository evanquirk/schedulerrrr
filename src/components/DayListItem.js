import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })

  const formatSpots = spots => {
    if (!spots) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return '1 spot remaining';
    }
    return `${spots} spots remaining`;
  }

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
    
  );
}