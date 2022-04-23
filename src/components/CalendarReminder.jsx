import React from 'react'
import PropTypes from 'prop-types'
import ReminderLabel from './ReminderLabel'
import ReminderForm from './ReminderForm'

import Weather from './Weather'


const propTypes = {
  disabled: PropTypes.bool
}

const defaultProps = {

  text: 'New Reminder',
  city: 'Recife'
}

const api = {
  key: "143e54a4430068c1c85702ec6b81ec44",
  base: "https://api.openweathermap.org/data/2.5/"

}

class CalendarReminder extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            editing: this.props.reminder.newReminder,
            active: false,
            category: this.props.reminder.category,

            text: this.props.reminder.text,
            city: this.props.reminder.city,
            date: this.props.date.format('DD MM YYYY'),
            weather: {}

        }
    }
    handleClick = () => {
      this.setState({ active: !this.state.active, editing: true})
    }

    handleSave = (formFields) => {
      const updatedReminder = {
        ...this.props.reminder,
        ...formFields,
        text: this.state.text,

        category: this.state.category,
        city: this.state.city
      }
      this.props.editReminder(this.props.weekIndex, this.props.weekdayIndex, updatedReminder);
      this.setState({ editing: false })
      if (typeof this.state.city != "undefined") {
        this.requestWeather()
      }
    }

    requestWeather(){
      fetch(`${api.base}weather?q=${this.state.city}&units=metric&APPID=${api.key}`)
      .then(res => res.json()
      )
      .then(result => {
        this.setState({weather: result})
        this.setState({city:''})
      })
      .catch((err) => {
      })
    }
    handleChange = (event) => {
      this.setState({text: event.target.value})

    }
    handleCategoryChange = event => {
      this.setState({ category: event.target.value })
    }

    handleCityChange = (event) => {
      this.setState({ city: event.target.value })
    }

    deleteReminder = () => {
      this.props.deleteReminder(this.props.weekIndex, this.props.weekdayIndex, this.props.reminder)
    }

    render() {
      return (
        <div className='reminder'>
          <ReminderLabel
            text={this.state.text}
            category={this.state.category}
            handleClick={this.handleClick}
          />
          <ReminderForm
            text={this.state.text}
            category={this.state.category}
            date={this.props.reminder.date}

            city={this.state.city}

            startTime={this.props.reminder.startTime}
            endTime={this.props.reminder.endTime}
            editing={this.state.editing}
            onChange={this.handleChange}
            onCategoryChange={this.handleCategoryChange}

            onCityChange={this.handleCityChange}
            onSave={(reminder) => this.handleSave(reminder)}
            onDelete={this.deleteReminder}
          />
          <Weather
            weather={this.state.weather}
            handleClick={this.handleClick}
          />

        </div>
      )
    }
}

CalendarReminder.propTypes = propTypes
CalendarReminder.defaultProps = defaultProps

export default CalendarReminder
