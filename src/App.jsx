import React, { useState } from 'react';
import Calendar from './Components/Calendar';
import dayjs from "dayjs";

const App = () => {
  const [date, setDate] = useState(dayjs());
  
  return (
    <div>
        <Calendar
          onChange ={(date) => setDate(date)}
        />
    </div>
  )
}

export default App;



