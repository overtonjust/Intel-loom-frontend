import moment from "moment";

const formatDate = (dateStr) => {
    const options = {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
    }
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', options )
};

const isClassDayToday = (dateStr) => {
    const today = formatDate(new Date());
    const classDay = formatDate(dateStr);

    return today === classDay;
};

const isHourFromStart = (dateStr) => {
    const currentTime = moment(new Date().getTime());
    const startTime = moment(new Date(dateStr).getTime());

    return Math.abs(currentTime.diff(startTime)) <= 3600000;
};

const convertTimeToMilliseconds = (timeString) => {
    const timeArr = timeString.split(':');
    let hours = timeArr[0] * 3600 * 1000;
    let minutes = timeArr[1] * 60 * 1000;
    let seconds = (timeArr[2] || 0) * 1000;

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
    
    return `${hours >= 1 ? hours + ' hour/s' : '' } ${minutes > 0 ? minutes + ' minute/s' : ''}`;
}

const checkTime = (timeStart, timeEnd) => {
    const startTime = convertTimeToMilliseconds(timeStart);
    const endTime = convertTimeToMilliseconds(timeEnd);
    const totalDuration = endTime - startTime;
    let seconds = Math.floor(totalDuration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    hours = hours % 24;
    
    return { hours, minutes };
}

const formatDateKey = dateStr => {
  if(dateStr === 'today') return 'Today';
  const dateParts = dateStr.split(',');
  const day = dateParts[0][0].toUpperCase() + dateParts[0].slice(1);
  return `${day} ${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
}

<<<<<<< HEAD
export { formatDate, formatTime, checkTime, formatDateKey, isClassDayToday, isHourFromStart };
=======
export { formatDate, formatTime, checkTime };


   // const downloadRecording = useCallback(() => {
    //     if(recordedBlob) {
    //         const url = URL.createObjectURL(recordedBlob);

    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'conference-recording.webm';
    //         link.click();
    //         URL.revokeObjectURL(url);
    //     }
    // }, [recordedBlob]);

    // useEffect(() => {
    //     if (isRecording) {
    //       // Monitor for changes in active media streams
    //       const tracks = mediaRecorderRef.current.stream.getTracks();
    //         tracks.forEach(track => {
    //         track.addEventListener('ended', async () => {
    //             // If a track has ended (e.g., due to screen sharing),
    //             // get the active stream and update the MediaRecorder
    //             const newStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    //             console.log(newStream)
    //             // Ensure the new stream has a video track (screen share)
    //             if (newStream.getVideoTracks().length > 0) {
    //                 const newRecorder = new MediaRecorder(newStream);
    //                 mediaRecorderRef.current = newRecorder;
    //                 console.log(mediaRecorderRef)
    //                 } else {
    //                 console.error('New stream does not contain screen share');
    //                 }
    //             });
    //         });
    //     }
    //   }, [isRecording, mediaRecorderRef]);
>>>>>>> 805d799 (working recording setup)
