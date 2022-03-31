import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const ownerTemplate = (book) => html `
<a class="button" href="/books/${book._id}/edit">Edit</a>
<a class="button" href="/books/${book._id}/delete">Delete</a>
`;

const loggedUserTemplate = (book) => html `
<a class="button" href="/books/${book._id}/like">Like</a>
`;


const detailsTemplate = (book, user) => html `<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        ${user._id === book._ownerId ? ownerTemplate(book) :loggedUserTemplate(book)}
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${book.likes}</span>
            
        </div>
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;


export const detailsView = (ctx) => {
    bookService.getBook(ctx.params.bookId)
        .then(book => {
            ctx.render(detailsTemplate(book, ctx.user));
        });
}