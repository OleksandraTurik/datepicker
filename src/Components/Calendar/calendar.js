import dayjs from "dayjs";

const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};

export function areEqual(a, b) {
    if (!a || !b) return false;
    
    return (
        a.year() === b.year() &&
        a.month() === b.month() &&
        a.date() === b.date()
    );
}

export function isRange(selectedDate, rangeDate, date) {

    if (rangeDate && selectedDate > rangeDate) {
        let temporary = selectedDate
        selectedDate = rangeDate
        rangeDate = temporary 
    }
    
    if (rangeDate && (selectedDate.date() <= date.date() && rangeDate.date() >= date.date())
                  && (selectedDate.month() === date.month() && rangeDate.month() === date.month())
                  && (selectedDate.year() === date.year() && rangeDate.year() === date.year())) {
        return true
    } else {
        return false
    }
}

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date) {
    const month = date.month();
    const year = date.year();
    const daysInMonth = DAYS_IN_MONTH[month];
    
    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.day();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export function getMonthData(year, month) {
    const result = [];
    const date = dayjs().set('year', year).set('month', month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];
        
        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = dayjs().set('year', year).set('month', month).set('date', day++);
            }
        }
    }

    return result;
}