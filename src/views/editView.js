import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';


const renderOption = (optionValue) => html `<option .value= ${optionValue} selected>${optionValue}</option>`;
const renderSelectedOption = (optionValue) => html `<option .value=${optionValue} selected>${optionValue}</option>`;


const editTemplte = (editHandler, book) => html `<section id="edit-page" class="edit">
<form id="edit-form" @submit=${editHandler} method="put">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" .value=${book.title}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description">${book.description}</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" .value=${book.type}>
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`;

export const editView = (ctx) => {

    const editHandler = (event) => {
        event.preventDefault();

        let formdata = new FormData(event.target);
        let title = formdata.get('title');
        let description = formdata.get('description');
        let imageUrl = formdata.get('imageUrl');
        let type = formdata.get('type');

        if (title.trim() == '' || description.trim() == '' || imageUrl.trim() == '' || type == undefined || type.trim() == '') {
            alert('All fields must be filled');
            return;
        }
        bookService.editBook({ title, description, imageUrl, type }, ctx.params.bookId, ctx.user.accessToken)
            .then(res => ctx.page.redirect(`/books/${ctx.params.bookId}/details`))
            .catch(err => alert(err.message));


    }
    bookService.getBook(ctx.params.bookId).then(book => {
        if (book.title != '' && book.type != '' && book.description != '' && book.imageUrl != '') {
            ctx.render(editTemplte(editHandler, book));
        }
    })
}