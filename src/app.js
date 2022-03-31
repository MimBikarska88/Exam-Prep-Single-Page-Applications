import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderMainContent, renderNavigation } from "./middlewares/renderMiddleware.js";
import { loginView } from "./views/loginView.js";
import { dashboardView } from './views/dashboardView.js';
import { registerView } from './views/registerView.js';
import { logoutView } from './views/logoutView.js';
import { detailsView } from './views/detailsView.js';
import { createView } from './views/addBookView.js';
import { editView } from './views/editView.js';
import { deleteView } from './views/deleteView.js';
import { myBooksView } from './views/myBooksView.js';

page(authMiddleware);
page(renderNavigation);
page(renderMainContent);

page('/', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/books/:bookId/details', detailsView);
page('/add', createView);
page('/books/:bookId/edit', editView);
page('/books/:bookId/delete', deleteView);
page('/myBooks', myBooksView);
page.start();