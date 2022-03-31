import * as userService from '../services/userService.js';

export const authMiddleware = (ctx, next) => {
    if (userService.getUser() != undefined) {
        ctx.user = userService.getUser();
    } else {
        ctx.user = undefined;
    }

    next();
}