import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

import { default as Sidebar } from "../Sidebar"

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className={style.chatWrapper}>
          Home component
        </div>
      </div>
    )
  }
}

export default cssModules(Home, style)
