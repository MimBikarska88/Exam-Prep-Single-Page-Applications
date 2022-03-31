import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const loginTemplate = (loginHandler) => html ` 
<section id="login-page" class="login">
<form id="login-form" @submit=${loginHandler} method="post">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
</form>
</section>`;

export const loginView = (ctx) => {
    const loginHandler = (event) => {
        event.preventDefault();
        let formdata = new FormData(event.currentTarget);
        let email = formdata.get('email');
        let password = formdata.get('password');
        if (email.trim() == '' || password.trim() == '') {
            alert('All fields must be filled!');
            return;
        }
        userService.login(email, password)
            .then(user => {
                if (user.code >= 400) {
                    throw new Error(user.message);
                }
                userService.saveUser(user);
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err.message);
            });

    }
    ctx.render(loginTemplate(loginHandler));
}