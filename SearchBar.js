import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://dpaste.com/79QXDY8TD.txt")
      .then((response) => response.text()) // Parse as text, since it's not JSON
      .then((text) => {
        try {
          const json = JSON.parse(text); // Parse the text as JSON manually
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              (user.country &&
              user.country.toLowerCase().includes(value.toLowerCase())) || 
              (user.capital && user.capital.toLowerCase().includes(value.toLowerCase()))            );
          });
          console.log(results);
          setResults(results);
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};