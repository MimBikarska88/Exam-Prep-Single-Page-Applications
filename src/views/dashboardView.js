import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';


const userTemplate = (book) => html `<a class="button" href="/books/${book._id}/details">Details</a>`;

export const noBooksFound = () => html `<p class="no-books">No books in database!</p>`;

const bookTemplate = (book, isAuthenticated) => html `
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
${isAuthenticated == undefined ? nothing : userTemplate(book)}
</li>`;

const dashboardTemplate = (books, isAuthenticated) => html `
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${books.length === 0 ? noBooksFound() : nothing}
<ul class="other-books-list">
${books.map(book => bookTemplate(book,isAuthenticated)) }
</ul>
</section>`;



export const dashboardView = (ctx) => {
    bookService.getAll()
        .then(books => {
            console.log(books);
            ctx.render(dashboardTemplate(books, ctx.user));
        })
}