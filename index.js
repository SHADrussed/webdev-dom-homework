//import { initAddCommentListener } from './modules/initListeners.js'
import { fetchAndLoad } from './modules/api.js'
import { app } from './modules/renderLogin.js'

export const elseContainer = document.getElementById('else-container')

app.innerHTML = '<h2>Загружаю комментарии...</h2>'

fetchAndLoad()

//initAddCommentListener()

console.log('It works!')
