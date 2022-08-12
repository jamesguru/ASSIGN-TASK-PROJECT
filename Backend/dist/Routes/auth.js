"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../Controllers/Auth");
const router = (0, express_1.Router)();
router.post('/register', Auth_1.registerDeveloper);
exports.default = router;
