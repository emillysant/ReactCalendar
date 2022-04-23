import React from 'react'

function Weather(props) {
    return (
        <div onClick={props.handleClick}>
            { typeof props.weather?.name != 'undefined'
            ? (props.weather?.name) : ('')}
            <p>weather:</p>  { typeof props.weather?.name != 'undefined'
            ? (props.weather?.weather[0].description) : ('')}
        </div>
    )
}

export default Weather