const baseUrl = 'http://localhost:3030/data/books';

export const getAll = () =>
    fetch(`${baseUrl}?sortBy=_createdOn%20desc`)
    .then(res => res.json());

export const getBook = (bookId) =>
    fetch(`${baseUrl}/${bookId}`)
    .then(res => res.json());

export const createNew = (book, accessToken) =>
    fetch(`${baseUrl}`, {
        method: 'post',
        headers: {
            'X-Authorization': accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(res => res.json());

export const editBook = (book, bookId, accessToken) =>
    fetch(`${baseUrl}/${bookId}`, {
        method: 'put',
        headers: {
            'X-Authorization': accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(res => res.json());

export const deleteBook = (bookId, accessToken) =>
    fetch(`${baseUrl}/${bookId}`, {
        method: 'delete',
        headers: {
            'X-Authorization': accessToken,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

export const getAllMy = (user) =>
    fetch(`${baseUrl}?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`, {
        headers: { 'X-Authorization': user.accessToken }
    })
    .then(res => res.json());