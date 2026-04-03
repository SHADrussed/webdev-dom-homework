export function postComment(newComment) {
    return fetch('https://wedev-api.sky.pro/api/v1/mikhail-zakharov/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
}
