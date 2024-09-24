
const formatDate = (dateStr) => {
    const options = {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
    }
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', options )
};

const convertTimeToMilliseconds = (timeString) => {
    const timeArr = timeString.split(':');
    let hours = timeArr[0] * 3600 * 1000;
    let minutes = timeArr[1] * 60 * 1000;
    let seconds = timeArr[2] * 1000;

    return hours + minutes + seconds
};

const formatTime = (timeStart, timeEnd) => {
    const startTime = convertTimeToMilliseconds(timeStart);
    const endTime = convertTimeToMilliseconds(timeEnd);
    const totalDuration = endTime - startTime;
    let seconds = Math.floor(totalDuration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    hours = hours % 24;

    return `${hours > 1 ? hours + ' hours' : '' } ${minutes > 0 ? minutes + ' minutes' : ''}`
};

export { formatDate, formatTime }