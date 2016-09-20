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
      currentRoom: null,
      input: "",
      lobbyList: [],
      mountChildren: false
    }

    this.changeChatroom = this.changeChatroom.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const params = this.props.user
    this.socket = new Socket(process.env.SOCKET_HOST, { params })
    this.socket.connect()
    this.configureAdminChannel()
  }

  componentWillUnmount() {
    if (this.channel) this.channel.leave()
    this.adminChannel.leave()
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

    this.adminChannel.on("lobby_list", (user) => {
      const userInLobbyList = this.state.lobbyList.find((lobbyUser) => user.id === lobbyUser.id)
      if (!userInLobbyList) {
        this.setState({ lobbyList: this.state.lobbyList.concat([user]) })
      }
    })

    this.adminChannel.join()
      .receive("ok", ({ id, lobby_list }) => {
        // added clearer logging to track when a user joins a topic
        console.log(`${id} succesfully joined the active_users topic.`)
        this.setState({ lobbyList: lobby_list, mountChildren: true })
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

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13 && this.state.currentRoom && this.state.input) {
      this.channel.push("message", {
        room: this.state.currentRoom,
        body: this.state.input,
        timestamp: new Date().getTime()
      })
      this.setState({ input: "" })
    }
  }

  // We use a ChatRoom stateless functional component(mouthful!) to replace the
  // code for rendering a chat room and its messages.
  render() {
    return (
      <div>
        <Sidebar
          presences={this.state.presences}
          lobbyList={this.state.lobbyList}
          onRoomClick={this.changeChatroom} />
        <ChatRoom
          input={this.state.input}
          handleChange={this.handleChange}
          handleMessageSubmit={this.handleMessageSubmit}
          currentRoom={this.state.currentRoom}
          messages={this.state.messages} />
        { this.state.mountChildren ? this.props.children : null }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Chat, style))
