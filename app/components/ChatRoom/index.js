import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

// This used to be in the Chat component
const renderMessages = (props) => {
  return props.messages.map(({ body, id, user_id, anonymous_user_id }) => {
    // Basic labels so admin knows who sent which messages
    const from = user_id ? 'Me' : anonymous_user_id
    const msg = `${from}: ${body}`

    return (<div key={id}>{ msg }</div>)
  })
}

// This used to be in the Chat component
const renderInput = (props) => {
  if (props.currentRoom) { return null }
  return (
    <input
      value={props.input}
      onKeyDown={props.handleMessageSubmit}
      onChange={props.handleChange}
      className={style.input} />
  )
}

export const ChatRoom = props => {
  return (
    <div className={style.chatWrapper}>
      { renderMessages(props) }
      { renderInput(props) }
    </div>
  )
}

export default cssModules(ChatRoom, style)
