import * as bookService from '../services/bookService.js';


export const deleteView = (ctx) => {
    const deleteFunction = (bookId) => {
        let remove = window.confirm('Are you sure you want to remove this book permanently?');
        if (remove) {
            bookService.deleteBook(bookId, ctx.user.accessToken)
                .then(res => ctx.page.redirect('/'))
                .catch(err => alert(err));
        }
    }
    deleteFunction(ctx.params.bookId);
}