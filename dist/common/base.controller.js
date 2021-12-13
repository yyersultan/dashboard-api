"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
class BaseController {
    constructor(logger) {
        this.logger = logger;
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        res.type('application/json');
        return res.status(200).json(message);
    }
    ok(res, message) {
        this.send(res, 200, message);
    }
    created(res) {
        return res.sendStatus(201);
    }
    bindRoutes(routes) {
        for (const route of routes) {
            this.logger.log(`${route.method} ${route.path}`);
            const handler = route.func.bind(this);
            this._router[route.method](route.path, handler);
        }
    }
}
exports.BaseController = BaseController;
