"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ResizeController_1 = require("../controllers/ResizeController");
var ResizeMiddleware_1 = require("../middlewares/ResizeMiddleware");
var routes = express_1.default.Router();
routes.get('/images', ResizeMiddleware_1.ResizeMiddleware.resizeImage, ResizeController_1.ResizeController.getResizedImage);
exports.default = routes;
