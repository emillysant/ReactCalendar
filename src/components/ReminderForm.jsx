import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  city: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
}

const defaultProps = {
  text: '',
  category: 'home',
  startTime: `${moment().format('HH')}:${moment().minutes()}`,
  endTime: `${moment().add(1, 'hours').format('HH')}:${moment().minutes()}`,
  city: ''
}

class ReminderForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: this.props.text,
      category: this.props.category,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      date: this.props.date,
      city: this.props.city
    }
    this.toggleIsActive = this.toggleIsActive.bind(this)
  }
  toggleIsActive () {
    this.setState({ active: !this.state.active })
  }
  handleDoubleClick = () => {
    this.setState({ editing: true })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { category, city } = this.state;
    const updatedReminder = {
      city,
      category,
      updateTime: moment(),
      newReminder: false,
      open: false
    }

    this.setState({ editing: false })
    this.props.onSave(updatedReminder)
  }
  handleStartTimeChange = e => {
    // if (e.target.value < moment().format('HH:mm')) {
    //   return;
    // }
    let timeArray = e.target.value.split(':')
    const hours = timeArray[0];
    const minutes = timeArray[1];
    let endtime
    const updatedStartDate = this.props.date.set({
      'hour': hours,
      'minute': minutes
    })
    if (parseInt(hours,10)+1 < 10) {
      endtime = "0"+`${parseInt(hours, 10) + 1}:${minutes}`
    } else if (parseInt(hours,10)+1 >= 10 && parseInt(hours,10)+1 < 24 ) {
      endtime = `${parseInt(hours, 10) + 1}:${minutes}`
    } else if (parseInt(hours,10)+1 === 24) {
      endtime = `${parseInt(hours, 10)}:${minutes}`
    }
    this.setState({
      startTime: e.target.value,
      date: updatedStartDate,
      endTime: endtime
    })
  }
  handleEndTimeChange = e => {
    // if (e.target.value < moment().format('HH:mm')) {
    //   return;
    // }

    let timeArray = e.target.value.split(':')
    const hours = timeArray[0];
    const minutes = timeArray[1];
    let endtime

    const updatedEndDate = this.props.date.set({
      'hour': hours,
      'minute': minutes
    })
    if (parseInt(hours,10) < 10) {
      endtime = "0"+`${parseInt(hours, 10)}:${minutes}`
    } else if (parseInt(hours,10) >= 10 && parseInt(hours,10) < 24 ) {
      endtime = `${parseInt(hours, 10)}:${minutes}`
    } else if (parseInt(hours,10) === 24) {
      endtime = `${parseInt(hours, 10) -1}:${minutes}`
    }

    this.setState({
      date: updatedEndDate,
      endTime: endtime
    })
  }
  render(){
    if (this.props.editing === false) return null
    return(
      <form className='reminder' onSubmit={this.handleSubmit}>
        <input
          type="type"
          maxLength="30"
          placeholder={this.props.placeholder || 'New reminder ...'}
          autoFocus={true}
          value={this.props.text}
          onChange={this.props.onChange}
        />
         <input
          type="text"
          value={this.props.city}
          placeholder="city"
          autoFocus={true}
          onChange={this.props.onCityChange}
        />
        <select onChange={this.props.onCategoryChange} value={this.props.category}>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="calendar">Calendar</option>
        </select>
        <input
          type="time"
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <input
          type="time"
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
        />
        <button type='button' onClick={this.props.onDelete}>X</button>
        <button type='submit' >Save</button>

      </form>
    )
  }
}

ReminderForm.propTypes = propTypes
ReminderForm.defaultProps = defaultProps

export default ReminderForm
