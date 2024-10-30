const Recording = ({ recording }) => {
  const { classDate, recordingKey, title } = recording;
  return (
    <div className="recording-container">
      <h3>{title}</h3>
      <video controls>
        <source src={recordingKey} type="video/mp4" />
      </video>
      <p>{classDate}</p>
    </div>
  );
};

export default Recording;
