import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const useSessionChecker = (API, setUser, user) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    const checkSession = () => {
      axios.get(`${API}/users/check-session`, { withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            console.log('Session is active');
          }
        })
        .catch(err => {
          console.error(err);
          setUser(false);
          navigate('/login', { state: { from: location } });
        });
    }
    checkSession();
    const interval = setInterval(checkSession, 300000);
    return () => clearInterval(interval);
  }, [API, navigate, location, setUser, user]);
}

export default useSessionChecker;
