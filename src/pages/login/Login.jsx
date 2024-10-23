import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import "./Login.scss";

const Login = () => {
  const { API, setUser, setMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const getPath = location.state?.from?.pathname || "/";
  const from = getPath === "/login" ? "/" : getPath;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email) {
      setMessage("Email is required");
      return;
    }
    if (!password) {
      setMessage("Password is required");
      return;
    }
    axios
      .post(`${API}/users/login`, credentials, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.response.data.error) {
          setMessage(err.response.data.error);
          return;
        }
        setMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <main className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <section className="login-form__title">
          <h2 className="login-form__text">Log In</h2>
        </section>
        <section className="login-form__group">
          <div className="form-input">
            <MdAlternateEmail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
        </section>
        <section className="login-form__group">
          <div className="form-input">
            <TbPasswordUser />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={credentials.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <LuEyeOff
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <LuEye
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </section>
        <section className="login-form__group main-btns">
          <button className="button-orange" type='button' onClick={() => navigate('/')}>Cancel</button>
          <button className="button-orange" type="submit">Log In</button>
        </section>
        <section className="login-form__group">
          <p className="forgot-password login-form__text">Forgot Password?</p>
        </section>
        <section className="login-form__group ">
          <button className="button-large-blue" type="button" onClick={() => navigate('/register')}>Register</button>
        </section>
      </form>
    </main>
  );
};

export default Login;
