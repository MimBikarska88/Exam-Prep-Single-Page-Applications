import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';
import { noBooksFound } from './dashboardView.js';

const bookTemplate = (book) => html `<li class="otherBooks">

<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/books/${book._id}/details">Details</a>
</li>`;

const myBooksTemplate = (books) => html `
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${books.length === 0 ? noBooksFound() : nothing}
<ul class="other-books-list">
${books.map(book => bookTemplate(book)) }
</ul>
</section>`;

export const myBooksView = (ctx) => {
    bookService.getAllMy(ctx.user)
        .then(books => {
            ctx.render(myBooksTemplate(books));
        })
}