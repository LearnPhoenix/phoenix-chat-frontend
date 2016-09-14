import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <h3>John Smith</h3>
      <p>Last active: {Math.floor((Math.random() * 10) + 1)} minutes ago.</p>
    </div>
  )
}

export default cssModules(Sidebar, style)
