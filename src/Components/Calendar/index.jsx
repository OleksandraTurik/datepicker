import React, { useState } from 'react'
import './index.css';
import styled from "styled-components";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import * as calendarE from './calendar';
import classnames from 'classnames';

const Header = styled.header`
display: flex;
justify-content: center;`;

const Button = styled.button`
    margin: 0 4px;
    color: dodgerblue;
    background: white;
    border: 1px solid dodgerblue;
    cursor: pointer;
    padding: 5px 8px 2px;
`
const Select = styled.select`
margin: 0 4px;
background-color: white;
color: dodgerblue;
font-weight: bold;
border: 1px solid dodgerblue;
`

const Table = styled.table `
table-layout: fixed;
border-collapse: separate;
border-spacing: 0;
margin: auto;
`
const Thead = styled.thead `
vertical-align: middle;
    text-align: center;
    height: 36px;
`
const Tr = styled.tr `
margin: 0;`

const Td = styled.td `
margin: 0;
padding: 5px;
border: 1px solid #e5e5e5;`

const Tbody = styled.tbody `
margin: 0;
text-align: center;`

const Span = styled.span `
margin: 0;
`

const Flex = styled.div `
display: flex;
align-items: center;
justify-content: center;
margin: 0 0 20px 0;
`

const Input = styled.input `
max-width: 90px;
margin: 10px;
`

const SpanLine = styled.span `
width: 20px;
border-bottom: 1px solid #000;
`

const Calendar = ({
    onChange = Function.prototype
}) => {

    const years = []
    for(let i = 1950; i <= 2060; i++) {
        years.push(i)
    }

    const month = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 
                'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    
    const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'];
    
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [rangeDate, setRangeDate] = useState(null);
    let currentDate = dayjs();

    const dt = dayjs()
    const [cdate, setDate] = useState(dt); 


    function PrevMonthButton() {    
        const date = cdate.subtract(1, 'month');
        setDate(date);
    }

    function NextMonthButton() {    
        const date = cdate.add(1, 'month');
        setDate(date);        
    }

    function handleSelectChangeYear(e) {
        setDate(cdate.year(e.target.value));
    };

    function handleSelectChangeMonth(e) {
        setDate(cdate.month(e.target.value));
    }
    
    const handleDayClick = date => {
        
        if (selectedDate && rangeDate) {
            setSelectedDate(date)
            setRangeDate(null)
            onChange(date)
            return 
        } else {
            setRangeDate(date)
            onChange(date)
            return
        }
    }; 
    
    const monthData = calendarE.getMonthData(cdate.year(), cdate.month());
    
    return (
      <div className="calendar">
          <Flex className="flex">
                {dt && <Input readOnly value={selectedDate.format('YYYY.MM.DD')} /> }                 
                {rangeDate && <SpanLine></SpanLine>}
                {rangeDate && <Input readOnly value={rangeDate.format('YYYY.MM.DD')} /> }
            </Flex>
          <Header>
              <Button onClick={PrevMonthButton}>{'<'}</Button>

                <Select value={cdate.month()} onChange={handleSelectChangeMonth}>{month.map((name, index) => 
                    <option key={name} value={index}>{name}</option>
                )}</Select>

                <Select value={cdate.year()} onChange={handleSelectChangeYear}> {years.map((name, index) => 
                    <option key={name} name={name}>{name}</option>
                )}
                </Select>

              <Button onClick={NextMonthButton}>{'>'}</Button>
          </Header>

          <Table>
              <Thead>
                    <Tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>    
                        )}
                    </Tr>
              </Thead>
              <Tbody>
                {monthData.map((week, index) =>
                    <tr key={index} className="week">
                        {week.map((date, index) => date ?
                            <Td
                                key={index}
                                className={classnames('day', {
                                    'today': calendarE.areEqual(date, currentDate),
                                    'selected': calendarE.areEqual(date, selectedDate),
                                    'range': calendarE.isRange(selectedDate, rangeDate, date)
                                })}
                                onClick={() => handleDayClick(date)}>
                                {date.date()}</Td>
                            :
                            <Td key={index} />
                        )}
                    </tr> 
                )}
              </Tbody>
          </Table>
      </div>
    
  )
}

Calendar.propTypes = {
    onChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    years: PropTypes.bool 
}

export default Calendar;
