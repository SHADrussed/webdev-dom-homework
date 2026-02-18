import { initAnswerListeners, initLikeListeners } from './initListeners.js'
import { comments } from './comments.js'

const commentsContainer = document.getElementById('comment-section')

export function renderComments() {
    const commentsHtml = comments
        .map(
            (comment, index) => `
        <li class="comment">
          <div class="comment-header">
            <div id='name'>${comment.nickname}</div>
            <div>${comment.date}</div>
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
        </li>`,
        )
        .join('')

    commentsContainer.innerHTML = commentsHtml

    initLikeListeners()
    initAnswerListeners()
}
