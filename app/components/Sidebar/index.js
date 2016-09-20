import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import style from "./style.css"

const listBy = (id, { metas: [first, ...rest] }) => {
  first.count = rest.length + 1
  first.id = id
  return first
}

const renderList = props => {
  return Presence.list(props.presences, listBy)
    .map(({ id }) => {
      return (
        <div
          onClick={() => { props.onRoomClick(id) }}>
          key={id}>
          { id }
        </div>
      )
    })
}

export const Sidebar = props => {
  return (
    <div className={style.sidebar}>
      { renderList(props) }
    </div>
  )
}

export default cssModules(Sidebar, style)
