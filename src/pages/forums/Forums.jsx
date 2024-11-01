import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Forums.scss";
import { FaAnglesDown } from "react-icons/fa6";
import profilePic from "../../assets/default-profile.png";
import { TypeAnimation } from "react-type-animation";
import Loader from "../../shared components/loader";
import { wrapLink } from "../../../utilsJSX";

const Forums = () => {
  const {
    API,
    loading,
    setLoading,
    isTabletOrMobile,
    fitsOneColumn,
    fitsTwoColumns,
    fitsThreeColumns,
  } = useContext(UserContext);
  const [forums, setForums] = useState([]);
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
    setLoading(true);

    axios
      .get(`${API}/forums?page=${page}`, { withCredentials: true })
      .then((res) => {
        if (page === 1) {
          setForums([]);
        }
        setForums((prev) => prev.concat(res.data.posts));
        setMorePosts(res.data.morePosts);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  if (loading) {
    return (
      <Loader />
    );
  }

  const bigScreen =
    (!isTabletOrMobile || fitsTwoColumns || fitsThreeColumns) && !fitsOneColumn;

  return (
    <main
      className={`forums-container ${bigScreen ? "forums-container-desktop" : "forums-container-mobile"}`}
    >
      <section
        className={`forums-container__community ${bigScreen ? "forums-container-desktop__community" : ""}`}
      >
        <h1>Welcome to Our Intel Loom's Community</h1>
        <p>
          This is a space for users to connect, share advice, ask questions, and
          support one another. Whether you're looking for recommendations, help
          with challenges, or simply a friendly conversation, you'll find a
          welcoming community here. Let’s grow, learn, and inspire each other!
        </p>
        <TypeAnimation
          sequence={[
            "Let's grow",
            3000,
            "Let's learn",
            3000,
            "Let's inspire each other",
            3000,
          ]}
          wrapper="h3"
          className="forums-container__slogan"
          repeat={Infinity}
        />
      </section>
      <section
        className={`forums-container__main ${bigScreen ? "forums-container-desktop__main" : ""}`}
      >
        <div className="forums-container__create-post">
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
        </div>
        <div className="forums-container__posts">
          {forums.map((forum) => {
            const { post, postId, userId, username, profilePicture } = forum;
            const formattedPost = wrapLink(post);
            return (
              <section className="forum-card" key={`post${postId}`}>
                <div className="forum-card__user">
                  <img
                    src={profilePicture ? profilePicture : profilePic}
                    alt={username}
                  />
                  <Link className="forum-link" to={`/profile/${userId}`}>
                    {username}
                  </Link>
                </div>
                <div className="forum-card__post">
                  <p>{formattedPost}</p>
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
        </div>
      </section>
    </main>
  );
};

export default Forums;
