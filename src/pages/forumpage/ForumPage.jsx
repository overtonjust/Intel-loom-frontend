import { useEffect, useState, useContext } from "react";
import { Link, useParams, Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./ForumPage.scss";
import ResponseLink from "./components/ResponseLink";
import ResponsePage from "./components/ResponsePage";
import { TbArrowBackUpDouble } from "react-icons/tb";

const ForumPage = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});
  const [responses, setResponses] = useState([]);
  const [moreResponses, setMoreResponses] = useState(false);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      response,
      postId,
      parentResponseId: null,
    };
    axios
      .post(`${API}/forums/response`, data, { withCredentials: true })
      .then((res) => {
        setResponses((prev) => prev.concat(res.data));
        setResponse("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${API}/forums/forum-info/${id}`, { withCredentials: true })
      .then((res) => setForum(res.data))
      .catch((err) => navigate('/404'));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API}/forums/post-responses/${id}?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        setResponses((prev) => [...res.data.responses, ...prev]);
        setMoreResponses(res.data.moreResponses);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const { post, userId, username, profilePicture, postId } = forum;

  return (
    <main className="forum-container">
      <section className="forum-container__back">
        <button onClick={() => navigate(-1)}>
          <TbArrowBackUpDouble />
        </button>
      </section>
      <section className="forum-card">
        <div className="forum-card__user">
          <img src={profilePicture} alt={username} />
          <Link className="forum-link" to={`/profile/${userId}`}>
            {username}
          </Link>
        </div>
        <div className="forum-card__post">
          <p>{post}</p>
        </div>
        <div className="forum-card__reply">
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
      <section className="forum-responses">
        <div className="forum-responses__title">
          <h2>Replies</h2>
        </div>
        <Routes>
          <Route
            path=""
            element={
              <div className="forum-responses__content">
                {moreResponses && responses.length > 0 && (
                  <div className="forum-responses__more">
                    <p onClick={() => setPage((prevState) => (prevState += 1))}>
                      Previous Replies
                    </p>
                  </div>
                )}
                {responses.map((res) => (
                  <ResponseLink key={res.responseId} res={res} />
                ))}
              </div>
            }
          />
          <Route path="reply/:replyId" element={<ResponsePage API={API} />} />
        </Routes>
      </section>
    </main>
  );
};

export default ForumPage;
