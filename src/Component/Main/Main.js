import React ,{useState}from "react";
import Front from "./Front/Front";
import Styles from "./Main.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Back from "./Back/Back";
import Information from "./Information/Information";

const Main = () => {
  const [pullGroupname, setpullGroupname] = useState("")
  return (
    <Router>
      <div className={Styles.splitscreen}>
        <div className={Styles.leftside}>
          <Front  setpullGroupname={setpullGroupname}/>
        </div>
        <div className={Styles.rightside}>
          <Routes>
            <Route path="/" element={<Back />} />
            <Route path="/information/:groupName" element={<Information  pushGroupData={pullGroupname} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Main;
