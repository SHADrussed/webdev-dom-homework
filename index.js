import { initAddCommentListener } from './modules/initListeners.js'
import { fetchAndLoad } from './modules/fetchAndLoad.js'
import { commentsContainer } from './modules/renderComments.js'

console.log(commentsContainer)
commentsContainer.innerHTML = '<h2>Загружаю комментарии...</h2>'
fetchAndLoad()

initAddCommentListener()

console.log('It works!')
