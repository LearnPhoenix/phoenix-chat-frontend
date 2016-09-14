import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

import { default as Button } from "../Button"

export class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    console.log("Submit button clicked")
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.form}>
          <div className={style.inputGroup}>
            <input
              placeholder="Username"
              className={style.input}
              type="text"
              id="signup-username" />
          </div>
          <div className={style.inputGroup}>
            <input
              placeholder="Email"
              className={style.input}
              type="text"
              id="signup-email" />
          </div>
          <div className={style.inputGroup}>
            <input
              placeholder="Password"
              className={style.input}
              type="password"
              id="signup-password" />
          </div>
          <div className={style.inputGroup}>
            <input
              placeholder="Verify Password"
              className={style.input}
              type="password"
              id="signup-verify-password" />
          </div>
          <Button
            onClick={this.submit}
            style={{ width: "100%" }}
            type="primary">
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default cssModules(Signup, style)
