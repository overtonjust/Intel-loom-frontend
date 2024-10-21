import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Forums.scss";
import { FaAnglesDown } from "react-icons/fa6";

const Forums = () => {
  const { API } = useContext(UserContext);
  const [forums, setForums] = useState([]);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/forums?page=${page}`, { withCredentials: true })
      .then((res) => {
        setForums((prev) => prev.concat(res.data.posts));
        setMorePosts(res.data.morePosts);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <main className="forums-container">
      {forums.map((forum) => {
        const { post, postId, userId, username, profilePicture } = forum;
        return (
          <section className="forum-card" key={postId}>
            <div className="forum-card__user">
              <img src={profilePicture} alt={username} />
              <Link className="forum-link" to={`/profile/${userId}`}>
                {username}
              </Link>
            </div>
            <div className="forum-card__post">
              <p>{post}</p>
            </div>
            <div className="forum-card__more">
              <Link className="forum-link" to={`/forum/${postId}`}>
                View / Reply
              </Link>
            </div>
          </section>
        );
      })}
      {morePosts && forums.length > 0 && (
        <FaAnglesDown
          onClick={() => setPage((prevState) => (prevState += 1))}
          className="home-container__more"
          size={30}
        />
      )}
    </main>
  );
};

export default Forums;
