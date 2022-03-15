import React from 'react';
import CalendarHeader from './../components/CalendarHeader';
import CalendarNavContainer from '../containers/CalendarNavContainer';
import CalendarMonthContainer from '../containers/CalendarMonthContainer';

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative 
  return (
    <div className="container">
        <h1>Calendar</h1>
        <CalendarNavContainer/>
        <CalendarHeader/>
        <CalendarMonthContainer/>
    </div>
  )
}

export default Calendar;