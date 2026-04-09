import { comments } from './comments.js'
import { name, token } from './api.js'
import {
    initAddCommentListener,
    initAnswerListeners,
    initLikeListeners,
    initLoginListener,
    initRegistrateListener,
} from './initListeners.js'
import { app } from './renderLogin.js'

export function renderComments() {
    const commentsHtml = comments
        .map((comment, index) => {
            //date configure
            let string_date = new Date(comment.date)
            let years = string_date.getFullYear()
            let month = string_date.getMonth() + 1
            let day = string_date.getDate()
            let hours = string_date.getHours()
            let minutes = string_date.getMinutes()
            let seconds = string_date.getSeconds()

            if (String(day).length === 1) {
                day = '0' + String(day)
            }
            if (String(month).length === 1) {
                month = '0' + String(month)
            }
            if (String(hours).length === 1) {
                hours = '0' + String(hours)
            }
            if (String(minutes).length === 1) {
                minutes = '0' + String(minutes)
            }
            if (String(seconds).length === 1) {
                seconds = '0' + String(seconds)
            }

            const date = `${day}.${month}.${years} ${hours}:${minutes}:${seconds}`

            //comments html
            return `<li class="comment">
          <div class="comment-header">
            <div id='name'>${comment.author.name}</div>
            <div>${date}</div>
          </div>
          <div class="comment-body">
            <div id='text' class ="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
        })
        .join('')

    const addCommentsHtml = `
    <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          id="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value=${name}
        />
        <textarea
          type="textarea"
          class="add-form-text"
          id="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
      </div>
      `

    const authBlock = `
    <div>
      <button id="login-page-button" class="button">Login</button>
      <button id="registrate-page-button" class="button">Registrate</button>
    </div>
    `

    const baseHtml = `
    <div class="container">${commentsHtml}</div>
    ${token ? addCommentsHtml : authBlock}
    `

    app.innerHTML = baseHtml

    if (token) {
        initLikeListeners()
        initAnswerListeners()
        initAddCommentListener()
    } else {
        initLoginListener()
        initRegistrateListener()
    }
}
