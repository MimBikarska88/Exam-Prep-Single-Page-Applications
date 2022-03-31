const baseUrl = 'http://localhost:3030/users';

export const login = (email, password) =>
    fetch(`${baseUrl}/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json());

export const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }

}

export const getAccessToken = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user).accessToken;
    }
}
export const isAuthenticated = () => {
    let user = localStorage.getItem('user');
    return Boolean(user);
}


export const register = (email, password) =>
    fetch(`${baseUrl}/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json());

export const logout = () =>
    fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': getAccessToken(),
        }
    })
    .then(res => {
        localStorage.removeItem('user');
    });