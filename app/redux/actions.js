const Actions = {}

Actions.userNew = function userNew(user) {
  return dispatch => fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    // TODO: More on this later
    console.log(res)
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userLogin = function userLogin(user) {
  return {
    type: "USER_LOGIN",
    payload: {
      user
    }
  }
}

export default Actions
