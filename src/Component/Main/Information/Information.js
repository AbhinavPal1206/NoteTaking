import React, { useState, useEffect } from "react";
import Styles from "./Information.module.css";

const Information = (props) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState('');

  useEffect(() => {
    // Load data from localStorage when the component mounts or when the group changes
    const storedData = JSON.parse(localStorage.getItem(props.pushGroupData)) || [];
    setSavedData(storedData);
    setSelectedGroupName(props.pushGroupData);
  }, [props.pushGroupData]);

  const handleCreate = () => {
    if (textareaValue.trim() !== "") {
      const currentDate = new Date();
      const dateTimeString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(currentDate);

      const newData = {
        content: textareaValue,
        dateTime: dateTimeString,
      };

      const updatedData = [...savedData, newData];
      setSavedData(updatedData);

      // Save the updatedData array to localStorage
      localStorage.setItem(props.pushGroupData, JSON.stringify(updatedData));

      setTextareaValue("");
    }
  };

  return (
    <div>
      <div className={Styles.b1}>
        <h2  className={Styles.b4}>{selectedGroupName}</h2>
        <div style={{ height: "70vh", maxWidth: "890px", overflow: "auto" }}>
          <div style={{ wordWrap: "break-word", margin: "15px" }}>
            {savedData.map((data, index) => (
              <div className={Styles.b2} key={index}>
                <p>{data.dateTime}</p>
                <p>{data.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{ position: "relative",width: "98%",maxwidth: "860px", marginLeft: "12px" }}
        >
          <textarea
            placeholder="Enter Text Here..........."
            style={{
              height: "18vh",
              width: "98%",
              boxSizing: "border-box",
              padding: "25px 10px 10px",
             
            }}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCreate();
              }
            }}
          />
          <button
            style={{ position: "absolute",top:"55px", right: "25px" }}
            onClick={handleCreate}
          >
            <svg
              width="35"
              height="29"
              viewBox="0 0 35 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
                fill="#ABABAB"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Information;
