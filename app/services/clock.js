export const getAngle = (time) => {
    let [hours, minutes, seconds] = time.split(':').map(Number);

    hours = hours % 12;

    const totalDegrees = (hours * 30) + (minutes * 0.5) + (seconds * (0.5 / 60));
    const angle = (Math.PI / 180) * totalDegrees;

    return (angle);
}