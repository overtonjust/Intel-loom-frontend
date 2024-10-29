import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Response from "./Response";
import ResponseLink from "./ResponseLink";
import { TbArrowBackUpDouble } from "react-icons/tb";

const ResponsePage = ({ API }) => {
  const { replyId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [responses, setResponses] = useState([]);
  const [moreResponses, setMoreResponses] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setResponses([]);
    axios
      .get(`${API}/forums/response-info/${replyId}`, { withCredentials: true })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
  }, [replyId]);

  useEffect(() => {
    axios
      .get(`${API}/forums/response-responses/${replyId}?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        setResponses((prev) => [...res.data.responses, ...prev]);
        setMoreResponses(res.data.moreResponses);
      })
      .catch((err) => console.log(err));
  }, [page, replyId]);

  return (
    <main className="response-page-container">
      <section className="response-page-container__back">
        <button onClick={() => navigate(-1)}>
          <TbArrowBackUpDouble />
        </button>
      </section>
      <section className="response-page-container__response">
        <Response API={API} res={response} setResponses={setResponses} />
      </section>
      <section className="response-page-container__responses">
        {moreResponses && responses.length > 0 && (
          <div className="response-page-container__more">
            <p onClick={() => setPage((prevState) => (prevState += 1))}>
              Previous Replies
            </p>
          </div>
        )}
        {responses.map((res) => (
          <ResponseLink key={res.responseId} res={res} />
        ))}
      </section>
    </main>
  );
};

export default ResponsePage;
