import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const headerElement = document.querySelector('#site-header');

const mainContent = document.querySelector('#site-content');


const renderContent = (templateResult) => {
    render(templateResult, mainContent);
}

export const renderNavigation = (ctx, next) => {
    render(navigationView(ctx), headerElement);
    next();
}

export const renderMainContent = (ctx, next) => {
    ctx.render = renderContent;
    next();
}