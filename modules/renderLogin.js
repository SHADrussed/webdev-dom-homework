import { fetchAndLoad, login, updateName, updateToken } from './api.js'
import { initRegistrateListener } from './initListeners.js'

export const app = document.getElementById('app')

export const renderLogin = () => {
    app.innerHTML = `
    <div class="auth-page">
  <h1 class="header">Login page</h1>
      <div class="form">
        <h3 class="form-title">Login form</h3>
        <div class="form-row">
          <input type="text" id="login-input" class="input" placeholder="Login" required>
          <input type="password" id="password-input" class="input" placeholder="Password" required>
        </div>
        <br />
        <button class="submit button" id="submit-button">Submit</button>
        <button class="button" id="registrate-page-button">Registrate</button>
      </div>
    `

    const button = document.getElementById('submit-button')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')

    button.addEventListener('click', () => {
        login({
            login: loginEl.value,
            password: passwordEl.value,
        }).then((responseData) => {
            updateToken(responseData.user.token)
            updateName(responseData.user.name)
            fetchAndLoad()
        })
    })

    initRegistrateListener()
}
