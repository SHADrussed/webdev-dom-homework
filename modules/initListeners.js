import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

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
        // let currentDate = new Date()
        textInputEl.classList.remove('error')
        nameInputEl.classList.remove('error')

        if (textInputEl.value === '' || nameInputEl.value === '') {
            textInputEl.classList.add('error')
            nameInputEl.classList.add('error')
            return
        }

        const newComment = {
            text: textInputEl.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            name: nameInputEl.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
        }

        fetch('https://wedev-api.sky.pro/api/v1/mikhail-zakharov/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                fetch(
                    'https://wedev-api.sky.pro/api/v1/mikhail-zakharov/comments',
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        updateComments(data.comments)
                        renderComments()
                        // Очищаем поля ввода
                        textInputEl.value = ''
                        nameInputEl.value = ''
                    })
                    .catch((error) => console.error(error))
            })
            .catch((error) => console.error(error))
    })

    // comments.push(newComment)

    // // Очищаем поля ввода
    // textInputEl.value = ''
    // nameInputEl.value = ''

    // // Перерисовываем все комментарии
    // renderComments(comments)
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
