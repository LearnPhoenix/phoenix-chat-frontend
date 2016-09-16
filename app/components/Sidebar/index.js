import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import style from "./style.css"

// Moved renderList and other functions to outside of the Sidebar function
// since we don't these functions defined every time we run the Sidebar
// function.
const orderByActivity = (a, b) => {
  if (a.active === b.active) return 0
  if (b.active === true) return 1
  return -1
}

const renderList = (props) => {
  // Since listBy wasn't doing anything special, just used an anonymous function
  // instead.
  const activeList = Presence.list(props.presences, (id, _metas) => id)

  const lobbyList = props.lobbyList.map(({ id, name, avatar }) => {
    const active = activeList.includes(id)
    return {
      id,
      active
    }
  })

  // No more filter code since we no longer include admins in the presences
  return lobbyList
    .sort(orderByActivity)
    .map(({ id, active }) => {
      const newStyle = active ? { boxShadow: "inset 0px 0px 6px 4px rgba(58, 155, 207, 0.6)" } : {}

      return (
        <div
          style={newStyle}
          className={style.user}
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
