import { updateComments } from './comments.js'
import { commentsContainer, renderComments } from './renderComments.js'

export function fetchAndLoad() {
    return fetch('https://wedev-api.sky.pro/api/v1/mikhail-zakharov/comments')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            updateComments(data.comments)

            commentsContainer.innerHTML = ''
            renderComments()
        })
        .catch((error) => console.error(error))
}
