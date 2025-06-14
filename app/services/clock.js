//calculate the angle of the pointer of the clock

//12 hours clock
export const getAngle = (dateTime) => {
    const [date, time] = dateTime.split("T")
    let [hours, minutes, seconds] = time.split(':').map(Number);

    hours = hours % 12;

    // Minute hand: 6° per minute + 0.1° per second
    const totalDegreesMinutes = (minutes * 6) + (seconds * 0.1);
    const angleMinutes = (Math.PI / 180) * totalDegreesMinutes;

    // Hour hand: 30° per hour + 0.5° per minute
    const totalDegreesHours = (hours * 30) + (minutes * 0.5);
    const angleHours = (Math.PI / 180) * totalDegreesHours;
    
    return ({ angleMinutes, angleHours });
}

//rewrite the time
export const getTime = (dateTime) => {
    const [date, time] = dateTime.split("T");
    const [hour, minutes, secondes] = time.split(":");
    return (
        {
            date: getDate(date),
            time: `${hour}:${minutes}`
        }
    )
}

export const getDate = (date) => {
    const monthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    const [year, month, day] = date.split("-");
    return (`${day} ${monthNames[month - 1]}`)
}

export const getISOLocalString = () => {
    let date = new Date();
    let tzo = -date.getTimezoneOffset();
    if (tzo === 0) {
        return date.toISOString();
    } else {
        let dif = tzo >= 0 ? '+' : '-';
        let pad = function (num, digits = 2) {
            return String(num).padStart(digits, "0");
        };
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds());
    }
}

export const timeDiff = (startTime, stopTime) => {
    const start = new Date(startTime);
    const stop = new Date(stopTime);

    //time diff in seconds
    const timeDifference = (stop - start) / 1000;

    //time in ISOstring
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;

    const timeDiffISO = ` T${hours}:${minutes}:${seconds}`;

    return timeDiffISO;
}