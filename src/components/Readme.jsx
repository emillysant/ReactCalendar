import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Counter from "./Counter";
import { Link } from "react-router-dom"; 

const README_PATH =
  "https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/README.md";

function Readme() {
  const [md, setMd] = useState(null);

  useEffect(() => {
    fetch(README_PATH, { mode: "cors" })
      .then((response) => response.text())
      .then((response) => {
        setMd(`${response}
        
## About Unit Tests:
The component below has a suite of tests to that could serve as guidance to unit test the calendar functionality, tests are located at \`src/components/Counter.test.jsx\`
        
`);
      });
  }, []);

  return (
    <div className="readme">
      <ReactMarkdown allowDangerousHtml children={md} />
      {md && (
        <>
          <Counter limit={3}/>
          <h1>Solution: </h1>
          <ul>
          <li>I didn't Build the application. That's why it's necessary to download, install the dependencies and start the application. The commands are already described above in "How to deploy"</li>
          <li>Go to route "http://localhost:3000/calendar" or click on the link below to open the application</li>
          <li>You can click on any date and a reminder component will appear</li>
          <li>It is possible to change the city and find the weather description. But the application only takes the weather of today's date</li>
          <li>the application does not recognize the location timezone. Use only one library pattern 'moment'</li>
          <li>The 'moment' lib was used just to get the day and time of the current moment to set as default reminders</li>
          <li>The application allows you to walk through all the months of the year and write down reminders. But if it is restarted it loses the information of the reminders</li>
          <li>I didn't have time to create the unit tests and style the reminder components</li>
          </ul>
          <h2>Communication with external api was done using openweather</h2>
          <a href='https://openweathermap.org/api'>See documentation</a>
          <h2>Click on the link below to open the application</h2>
          <Link to='/calendar'>Go to Calendar page</Link>
          
        </>
      )}
    </div>
  );
}

export default Readme;
