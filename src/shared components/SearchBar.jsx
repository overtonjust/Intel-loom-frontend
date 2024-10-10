import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import "./SearchBar.scss";

const SearchBar = ({ classes, setDisplay }) => {
  const [wordEntered, setWordEntered] = useState("");
  const [searchType, setSearchType] = useState("general");

  const filterClasses = (wordEntered) => {
    if (wordEntered === "") {
      return classes;
    }
    if (searchType === "price") {
      const filteredClasses = classes.filter((classObj) => {
        const { price } = classObj;
        return price <= Number(wordEntered);
      });
      return filteredClasses;
    }
    const filteredClasses = classes.filter((classObj) => {
      const { title, instructor } = classObj;
      const fullName = !instructor?.middleName
        ? `${instructor?.firstName} ${instructor?.lastName}`
        : `${instructor?.firstName} ${instructor?.middleName} ${instructor?.lastName}`;
      return (
        title.toLowerCase().includes(wordEntered.toLowerCase()) ||
        fullName.toLowerCase().includes(wordEntered.toLowerCase())
      );
    });
    return filteredClasses;
  };

  useEffect(() => {
    setDisplay(filterClasses(wordEntered));
  }, [wordEntered, classes]);

  useEffect(() => setWordEntered(""), [searchType]);

  return (
    <main className="search-container">
      <section className="search">
        <div className="search__select">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="search__input">
          <input
            type="text"
            placeholder={
              searchType === "general"
                ? "Search..."
                : "No more than...Enter a number"
            }
            value={wordEntered}
            onChange={(e) => setWordEntered(e.target.value)}
          />
          {wordEntered.length > 0 && (
            <CiTrash
              className="trash-icon"
              onClick={() => setWordEntered("")}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default SearchBar;
