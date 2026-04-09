import { fetchAndLoad, registration, updateName, updateToken } from './api.js'
import { initLoginListener } from './initListeners.js'

export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <div class="auth-page">
  <h1 class="header">Registration page</h1>
      <div class="form">
        <h3 class="form-title">Registration form</h3>
        <div class="form-row">
          <input type="text" id="registration-input" class="input" placeholder="Registration" required>
          <input type="name" id="name-input" class="input" placeholder="Your Name" required>
          <input type="password" id="password-input" class="input" placeholder="Password" required>
        </div>
        <br />
        <button class="submit button" id="submit-button">Submit</button>
        <button class="button" id="login-page-button">Login</button>
      </div>
    `

    const button = document.getElementById('submit-button')
    const nameEl = document.getElementById('name-input')
    const regEl = document.getElementById('registration-input')
    const passwordEl = document.getElementById('password-input')

    button.addEventListener('click', () => {
        registration({
            name: nameEl.value,
            login: regEl.value,
            password: passwordEl.value,
        }).then((responseData) => {
            updateToken(responseData.user.token)
            updateName(responseData.user.name)
            fetchAndLoad()
        })
    })

    initLoginListener()
}
