import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { app } from './renderLogin.js'

const host = 'https://wedev-api.sky.pro/api/v2/mikhail-zakharov'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = localStorage.getItem('token') // Начальное значение токена

export const updateToken = (newToken) => {
    if (!localStorage.getItem('token')) {
        localStorage.setItem('token', newToken)
    }
    token = newToken // Обновляем токен
}

export let name = localStorage.getItem('name')

export const updateName = (newName) => {
    if (!localStorage.getItem('name')) {
        localStorage.setItem('name', newName)
    }
    name = newName
}

export function postComment(text) {
    return fetch(`${host}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function fetchAndLoad() {
    return fetch(`${host}/comments`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            updateComments(data.comments)
            app.innerHTML = ''
            renderComments()
        })
        .catch(() => alert('Произошла ошибка'))
        .finally(() => {
            console.log('done')
        })
}

export function login({ login, password }) {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => response.json())
}

export function registration({ login, name, password }) {
    return fetch(`${authHost}`, {
        method: 'POST',
        body: JSON.stringify({ login, name, password }),
    }).then((response) => response.json())
}
