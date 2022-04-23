import React from 'react'
import moment from 'moment'
import { PropTypes } from 'prop-types';
import CalendarReminder from './CalendarReminder'

const propTypes = {
    disabled: PropTypes.bool
}

class CalendarMonth extends React.Component {
    constructor (props) {
        super(props)
        this.renderWeeks = this.renderWeeks.bind(this)
    }

    getDayClass (day) {
        const today = moment()
        const classes = ['week__day']
        if (today.isSame(day, 'd')) {
          classes.push('week__day--today')
        }
        if (today > day) {
          classes.push('week__day--past')
        }
        if (day.day() === 0 || day.day() === 6) {
          classes.push('week__day--weekend')
        }
        return classes.join(' ')
    }
    
    handleClick( weekIndex, weekdayIndex, weekdayDate){
        if(moment() > weekdayDate) return

        this.props.actions.addReminder(weekIndex, weekdayIndex, weekdayDate)

    }

    renderWeeks(week, index){
        const { month, actions } = this.props
        return month?.map((week, index) => (
            <div key={week.uuid} className='week'>
                {week.days?.map((weekday, index) => (
                    <div
                        key={weekday.uuid}
                        className={this.getDayClass(weekday.date)}
                        onDoubleClick={() => this.handleClick(week.index, weekday.index, weekday.date)}
                    >
                        {weekday.date.format("D")}
                        {weekday.reminders?.map((reminder) => (

                            <CalendarReminder
                                key={reminder.uuid}
                                reminder={reminder}
                                weekIndex={week.index}
                                weekdayIndex={weekday.index}

                                date={weekday.date}

                                editReminder={actions.editReminder}
                                deleteReminder={actions.deleteReminder}
                            />
                    
                        ))}
                    </div>
                ))}
            </div>
        ))
    }
    render() {
        return <div className="calendar__month">{this.renderWeeks()}</div>
    }
}

CalendarMonth.propTypes = propTypes

export default CalendarMonth