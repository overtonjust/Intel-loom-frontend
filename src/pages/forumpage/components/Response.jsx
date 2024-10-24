import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Response = ({ API, res, setResponses }) => {
  const {
    response: resp,
    responseId,
    userId,
    username,
    profilePicture,
    postId,
  } = res;
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    if (!response) return;
    const data = {
      response,
      postId,
      parentResponseId: responseId,
    };
    axios
      .post(`${API}/forums/response`, data, { withCredentials: true })
      .then((res) => {
        setResponses((prev) => prev.concat(res.data));
        setResponse("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="response-container">
      <section className="response-card">
        <div className="response-card__user">
          <img src={profilePicture} alt={username} />
          <Link className="forum-link" to={`/profile/${userId}`}>
            {username}
          </Link>
        </div>
        <div className="response-card__resp">
          <p>{resp}</p>
        </div>
        <div className="response-card__reply">
          <div className="reply-input">
            <input
              type="text"
              placeholder="Reply..."
              onChange={handleChange}
              value={response}
            />
            <button className="button-orange" onClick={handleSubmit}>
              Reply
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Response;
