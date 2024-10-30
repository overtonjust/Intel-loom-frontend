import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Forums.scss";
import { FaAnglesDown } from "react-icons/fa6";
import profilePic from '../../assets/default-profile.png';

const Forums = () => {
  const { API, loading, setLoading } = useContext(UserContext);
  const [forums, setForums] = useState(null);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(false);
  const [post, setPost] = useState("");

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = () => {
    if (!post) return;
    const data = {
      post,
    };
    axios
      .post(`${API}/forums`, data, { withCredentials: true })
      .then((res) => {
        setForums((prev) => [res.data, ...prev]);
        setPost("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true)

    axios
      .get(`${API}/forums?page=${page}`, { withCredentials: true })
      .then((res) => {
        if (page === 1) {
          setForums([]);
        }
        setForums((prev) => prev.concat(res.data.posts));
        setMorePosts(res.data.morePosts);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [page]);

  if (loading) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main className="forums-container">
      <section className="forums-container__create-post">
        <div className="post-input">
          <input
            type="text"
            placeholder="Create a post..."
            onChange={handleChange}
            value={post}
          />
          <button className="button-orange" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </section>
      <section className="forums-container__posts">
        {forums.map((forum) => {
          const { post, postId, userId, username, profilePicture } = forum;
          return (
            <section className="forum-card" key={`post${postId}`}>
              <div className="forum-card__user">
                <img src={profilePicture ? profilePicture : profilePic} alt={username} />
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
      </section>
    </main>
  );
};

export default Forums;
