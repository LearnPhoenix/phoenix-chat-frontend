import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import style from "./style.css"

// Moved listBy and renderList functions to outside of the Sidebar function
// since we don't these functions defined every time we run the Sidebar
// function.
const listBy = (id, { metas: [first, ...rest] }) => {
  first.count = rest.length + 1
  first.id = id
  return first
}

const renderList = (props) => {
  // No more filter code since we no longer include admins in the presences
  return Presence.list(props.presences, listBy)
    .map(({ id }) => {
      return (
        <div
          key={id}
          onClick={() => { props.onRoomClick(id) }}>
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
