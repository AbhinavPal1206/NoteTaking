import React, { useState, useEffect } from "react";
import Styles from "./Front.module.css";
import { useNavigate } from "react-router-dom";

const Front = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const storedGroups = localStorage.getItem("notesGroups");
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setGroupName("");
    setSelectedColor("");
  };

  const handleOutsideClick = (e) => {
    if (isPopupOpen && e.target.className === Styles.popupBackground) {
      closePopup();
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleColorSelect = (color) => {
    if (color === 1) {
      setSelectedColor("#B38BFA");
    } else if (color === 2) {
      setSelectedColor("#FF79F2");
    } else if (color === 3) {
      setSelectedColor("#43E6FC");
    } else if (color === 4) {
      setSelectedColor("#F19576");
    } else if (color === 5) {
      setSelectedColor("#0047FF");
    } else if (color === 6) {
      setSelectedColor("#6691FF");
    }
  };

  const handleCreateGroup = () => {
    if (groupName && selectedColor) {
      const newGroup = {
        groupName,
        selectedColor,
      };

      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      localStorage.setItem("notesGroups", JSON.stringify(updatedGroups));

      closePopup();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleGroupClick = (groupName) => {
    navigate(`/information/${encodeURIComponent(groupName)}`);
    props.setpullGroupname(groupName)
  };

  return (
    <div>
      <p className={Styles.h}>Pocket Notes</p>
      <button className={Styles.h1} onClick={openPopup}>
        + Create Notes group
      </button>

      {isPopupOpen && (
        <div className={Styles.popupBackground} onClick={handleOutsideClick}>
          <div className={Styles.popupContent}>
            <p className={Styles.h2}>Create New Notes group</p>
            <p className={Styles.h3}>
              Group Name{" "}
              <input
                className={Styles.h4}
                placeholder="Enter Your Group Name"
                value={groupName}
                onChange={handleGroupNameChange}
              />
            </p>
            <p className={Styles.h5}>Choose colour</p>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                className={Styles.h6}
                src={require(`./i${i}.png`)}
                alt={`i${i}`}
                onClick={() => handleColorSelect(i)}
              />
            ))}
            <button className={Styles.h7} onClick={handleCreateGroup}>
              Create
            </button>
          </div>
        </div>
      )}
      <div className={Styles.scrollContainer}>
        {groups.map((group, index) => (
          <div key={index} className={Styles.h8}>
            <div
              style={{
                backgroundColor: group.selectedColor,
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                marginTop: "10px",
              }}
            ></div>
            <div
              className={Styles.h9}
              onClick={() => handleGroupClick(group.groupName)}
            >
              {group.groupName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Front;
