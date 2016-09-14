const Actions = {}

Actions.userNew = function userNew(user) {
  return {
    type: "USER_NEW",
    payload: {
      user
    }
  }
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
