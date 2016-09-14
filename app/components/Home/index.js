import React from "react"

import { default as Sidebar } from "../Sidebar"

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        Home component
      </div>
    )
  }
}

export default Home
