import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const templateCreate = (createHandler) => html ` 
<section id="create-page" class="create">
<form id="create-form" @submit=${createHandler} method="post">
    <fieldset>
        <legend>Add new Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" placeholder="Title">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type">
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Add Book">
    </fieldset>
</form>
</section>`;


export const createView = (ctx) => {
    const createHandler = (event) => {
        event.preventDefault();
        let formdata = new FormData(event.target);
        let title = formdata.get('title');
        let description = formdata.get('description');
        let imageUrl = formdata.get('imageUrl');
        let type = formdata.get('type');

        if (title.trim() == '' || description.trim() == '' || imageUrl.trim() == '' || type.trim() == '') {
            alert('All fields must be filled');
            return;
        }
        bookService.createNew({ title, imageUrl, description, type }, ctx.user.accessToken)
            .then(book => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err.message);
            })


    }
    ctx.render(templateCreate(createHandler));
}