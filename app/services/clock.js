//calculate the angle of the pointer of the clock
//12 hours clock
export const getAngle = (dateTime) => {
    const [date, time] = dateTime.split("T")
    let [hours, minutes, seconds] = time.split(':').map(Number);

    hours = hours % 12;

    const totalDegrees = (hours * 30) + (minutes * 0.5) + (seconds * (0.5 / 60));
    const angle = (Math.PI / 180) * totalDegrees;

    return (angle);
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
    return (`${day} ${monthNames[month-1]}`)
}
