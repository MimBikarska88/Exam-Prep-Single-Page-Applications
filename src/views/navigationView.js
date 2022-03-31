import { html } from '../../node_modules/lit-html/lit-html.js';


const authTemplate = (user) => html ` <div id="user">
<span>Welcome, ${user.email}</span>
<a class="button" href="/myBooks">My Books</a>
<a class="button" href="/add">Add Book</a>
<a class="button" href="/logout">Logout</a>
</div>`;

const guestTemplate = () => html `<div id="guest">
<a class="button" href="/login">Login</a>
<a class="button" href="/register">Register</a>
</div>`;

const navTemplate = (isAuthenticated) => html `
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    ${isAuthenticated != undefined ?   authTemplate(isAuthenticated) : guestTemplate()  }
                </section>
            </nav>
`;


export const navigationView = (ctx) => {
    return navTemplate(ctx.user);
}