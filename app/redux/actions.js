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
    /* If success, log the user in */
    localStorage.token = res.data.token
    /* Then send action to reducer */
    dispatch({
      type: "USER_NEW",
      payload: {
        user: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userLogin = function userLogin(user) {
  return dispatch => fetch("http://localhost:4000/auth/identity/callback", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    /* If success, log the user in */
    localStorage.token = res.data.token
    /* Then send action to reducer */
    dispatch({
      type: "USER_LOGIN",
      payload: {
        user: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

export default Actions
