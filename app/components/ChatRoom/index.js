import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

const renderMessages = (props) => {
  return props.messages.map(({ body, id }, i) => {
    return (
      <div key={id}>
        { body }
      </div>
    )
  })
}

export const ChatRoom = props => {
  return (
    <div className={style.chatWrapper}>
      { renderMessages(props) }
    </div>
  )
}

export default cssModules(ChatRoom, style)
