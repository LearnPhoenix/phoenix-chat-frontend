import React from "react"
import cssModules from "react-css-modules"
import { Socket, Presence } from "phoenix"
import { connect } from "react-redux"
import style from "./style.css"

import { default as Sidebar } from "../Sidebar"
import { default as ChatRoom } from "../ChatRoom"

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presences: {},
      messages: [],
      currentRoom: ""
    }

    this.changeChatroom = this.changeChatroom.bind(this)
  }

  componentDidMount() {
    const params = this.props.user
    this.socket = new Socket("ws://localhost:4000/socket", { params })
    this.socket.connect()
    this.configureAdminChannel()
  }

  configureAdminChannel() {
    this.adminChannel = this.socket.channel("admin:active_users")

    this.adminChannel.on("presence_state", state => {
      const presences = Presence.syncState(this.state.presences, state)
      // added clearer logging to track presences
      console.log('Presences after sync: ', presences)
      this.setState({ presences })
    })

    this.adminChannel.on("presence_diff", state => {
      const presences = Presence.syncDiff(this.state.presences, state)
      // added clearer logging to track presences
      console.log('Presences after diff: ', presences)
      this.setState({ presences })
    })

    this.adminChannel.join()
      .receive("ok", ({ id }) => {
        // added clearer logging to track when a user joins a topic
        console.log(`${id} succesfully joined the active_users topic.`)
      })
  }

  changeChatroom(room) {
    this.channel = this.socket.channel(`room:${room}`)
    this.setState({
      messages: []
    })
    this.configureRoomChannel(room)
  }

  configureRoomChannel(room) {
    this.channel.join()
      .receive("ok", ({ messages }) => {
        console.log(`Succesfully joined the ${room} chat room.`, messages)
        this.setState({
          messages,
          currentRoom: room
        })
      })
      .receive("error", () => { console.log(`Unable to join the ${room} chat room.`) })

    this.channel.on("message", payload => {
      this.setState({
        messages: this.state.messages.concat([payload])
      })
    })
  }

  // We use a ChatRoom stateless functional component(mouthful!) to replace the
  // code for rendering a chat room and its messages.
  render() {
    return (
      <div>
        <Sidebar
          presences={this.state.presences}
          onRoomClick={this.changeChatroom} />
        <ChatRoom messages={this.state.messages} />
        { this.props.children }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Chat, style))
