import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

export function initLikeListeners() {
    const likeButtons = document.querySelectorAll('.like-button')

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = parseInt(button.dataset.index)
            toggleLike(index)
        })
    })
}

export function initAnswerListeners() {
    const textInputEl = document.getElementById('add-form-text')
    const comments = document.querySelectorAll('.comment')

    comments.forEach((comment) => {
        comment.addEventListener('click', () => {
            const name = comment.querySelector('#name').textContent.trim()
            const text = comment.querySelector('#text').textContent.trim()
            textInputEl.value = `${name} >\n"${text}"`
        })
    })
}

export function initAddCommentListener() {
    const textInputEl = document.getElementById('add-form-text')
    const sendButtonEl = document.getElementById('add-form-button')
    const nameInputEl = document.getElementById('add-form-name')
    sendButtonEl.addEventListener('click', () => {
        let currentDate = new Date()
        textInputEl.classList.remove('error')
        nameInputEl.classList.remove('error')

        if (textInputEl.value === '' || nameInputEl.value === '') {
            textInputEl.classList.add('error')
            nameInputEl.classList.add('error')
            return
        }

        // Создаем новый комментарий и добавляем в массив
        const newComment = {
            nickname: nameInputEl.value,
            date: `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear().toString().slice(-2)} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`,
            text: textInputEl.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            likes: 0,
            isLiked: false,
        }

        comments.push(newComment)

        // Очищаем поля ввода
        textInputEl.value = ''
        nameInputEl.value = ''

        // Перерисовываем все комментарии
        renderComments(comments)
    })
}

function toggleLike(index) {
    const comment = comments[index]

    if (comment.isLiked) {
        comment.likes--
        comment.isLiked = false
    } else {
        comment.likes++
        comment.isLiked = true
    }

    renderComments(comments)
}
