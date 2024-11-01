import { Link, useParams } from "react-router-dom";
import profilePic from '../../../assets/default-profile.png';
import { wrapLink } from "../../../../utils";

const ResponseLink = ({ res }) => {
  const { responseId, response, userId, username, profilePicture } = res;
  const { id } = useParams();
  const formattedResponse = wrapLink(response);
  return (
    <div className="response-card" key={`response${responseId}`}>
      <div className="response-card__user">
        <img src={profilePicture ? profilePicture : profilePic} alt={username} />
        <Link className="forum-link" to={`/profile/${userId}`}>
          {username}
        </Link>
      </div>
      <div className="response-card__resp">
        <p dangerouslySetInnerHTML={{ __html: formattedResponse }}></p>
      </div>
      <div className="response-card__more">
        <Link className="forum-link" to={`/forum/${id}/reply/${responseId}`}>
          View / Reply
        </Link>
      </div>
    </div>
  );
};

export default ResponseLink;
