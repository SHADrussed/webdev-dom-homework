import { renderComments } from './modules/renderComments.js'
import { initAddCommentListener } from './modules/initListeners.js'
import { updateComments } from './modules/comments.js'

fetch('https://wedev-api.sky.pro/api/v1/mikhail-zakharov/comments')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        updateComments(data.comments)
        renderComments()
    })
    .catch((error) => console.error(error))

initAddCommentListener()

console.log('It works!')
