import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class ChatRoom extends React.Component {
  componentDidUpdate() {
    if (this.props.messages.length > 0) {
      const lastMessage = this[`chatMessage:${this.props.messages.length - 1}`]
      this.chatContainer.scrollTop = lastMessage.offsetTop
    }
  }

  render() {
    return (
      <div
        ref={ref => { this.chatContainer = ref }}
        className={style.chatWrapper}>
        { this.renderMessages(this.props) }
      </div>
    )
  }
}

export default cssModules(ChatRoom, style)
