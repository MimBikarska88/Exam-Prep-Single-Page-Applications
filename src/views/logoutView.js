import * as userService from '../services/userService.js';

export const logoutView = (ctx) => {
    userService.logout()
        .then(res => {
            ctx.page.redirect('/');
        })
        .catch(err => alert(err));

}