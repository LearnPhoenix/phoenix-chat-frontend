import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export const Sidebar = () => {
  return (
    <div>
      This is the sidebar
    </div>
  )
}

export default cssModules(Sidebar, style)
