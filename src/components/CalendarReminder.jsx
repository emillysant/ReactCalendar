import React from 'react'
import PropTypes from 'prop-types'
import ReminderLabel from './ReminderLabel'
import ReminderForm from './ReminderForm'

const propTypes = {
  disabled: PropTypes.bool
}

const defaultProps = {
  text: 'New Reminder'
}

class CalendarReminder extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            editing: this.props.reminder.newReminder,
            active: false,
            category: this.props.reminder.category,
            text: this.props.reminder.text
        }
    }
    handleClick = () => {
      this.setState({ active: !this.state.active, editing: true})
    }
    handleChange = (event) => {
      this.setState({text: event.target.value})
    }
    handleSave = (formFields) => {
      const updatedReminder = {
        ...this.props.reminder,
        ...formFields,
        text: this.state.text,
        category: this.state.category
      }
      this.props.editReminder(this.props.weekIndex, this.props.weekdayIndex, updatedReminder);
      this.setState({ editing: false })
    }
    handleCategoryChange = event => {
      this.setState({ category: event.target.value })
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
            startTime={this.props.reminder.startTime}
            endTime={this.props.reminder.endTime}
            editing={this.state.editing}
            onChange={this.handleChange}
            onCategoryChange={this.handleCategoryChange}
            onSave={(reminder) => this.handleSave(reminder)}
            onDelete={this.deleteReminder}
          />
        </div>
      )
    }
}

CalendarReminder.propTypes = propTypes
CalendarReminder.defaultProps = defaultProps

export default CalendarReminder
