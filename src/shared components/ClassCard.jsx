// Dependencies
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isHourFromStart, isClassDayToday } from "../../utils";
import "./ClassCard.scss";

const ClassCard = ({ classInfo, dateId, dateInfo }) => {
  const { setClassDateId } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { classId, title, highlightPicture, classPictures, price } = classInfo;
  const { firstName, lastName } = classInfo.instructor || "";
  let { classStart, classEnd } = dateInfo || "";
  const startTime = new Date(classStart).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
  const endTime = new Date(classEnd).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const handleJoinRoom = (e, id) => {
    e.stopPropagation();
    if (dateId) {
      setClassDateId(dateId);
    }
    navigate(`/view/${id}`);
  };

  return (
    <section
      onClick={
        dateId
          ? () => navigate(`/mylectures/${dateId}`)
          : () => navigate(`/classInfo/${classId}`)
      }
      className="class"
    >
      <h2 className="class__title ">{title}</h2>
      <img
        className="class__image"
        src={highlightPicture ? highlightPicture : classPictures[0]}
        alt={title}
      />
      <article className="class__info-box">
        <div className="class__row">
          {pathname.includes("/myclasses") && (
            <p className="class__time">
              {startTime} - {endTime}
            </p>
          )}
          {pathname.includes("/myclasses") &&
          isClassDayToday(classStart) &&
          isHourFromStart(classStart) ? (
            <button
              className="button-orange class__link"
              onClick={(e) => handleJoinRoom(e, classId)}
            >
              Join Class
            </button>
          ) : pathname === "/" ? (
            <div className="price-instructor">
              <p className="class__text">
                {firstName} {lastName?.charAt(0)}
              </p>
              <p className="class__text">${Number(price).toFixed(0)}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </article>
    </section>
  );
};

export default ClassCard;
