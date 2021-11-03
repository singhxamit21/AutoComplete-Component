import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Custom.css"

export default function AutoComponent() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://fake-movie-database-api.herokuapp.com/api?s=batman"
      );
      console.log(response.data.Search);
      setUsers(response.data.Search);
    };
    loadUsers();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  const onChangeHandler = (e) => {
    let text = e.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`,"gi");
        return user.Title.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  };

  return (
    <div>
      <h1>Auto Component using API</h1>
      <input
        type="text"
        onChange={onChangeHandler}
        value={text}
      ></input>
  
      {suggestions.map((suggestion,i)=>
        <div className="suggestion" key={i} onClick={()=>onSuggestHandler(suggestion.Title)}>{suggestion.Title}</div> 
      )}
      {/* {users.map(user => <div key={user.imdbID}>
          <h1>{user.Title}</h1>
      </div>)} */}
    </div> 
  );
}
