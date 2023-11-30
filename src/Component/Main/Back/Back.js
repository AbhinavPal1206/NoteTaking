import React from 'react'
import Styles from "./Back.module.css"

const Back = () => {
  return (
    <div>
      <img className={Styles.a1} src={require("./image 1.png")} alt="image1"/>
      <p className={Styles.a2}>Pocket Notes</p>
      <p className={Styles.a3}>Send and receive messages without keeping your phone online.<br/>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      <p className={Styles.a4} ><img src={require("./image 2.png")} alt="image2"/>end-to-end encrypted</p>
    </div>
  )
}

export default Back