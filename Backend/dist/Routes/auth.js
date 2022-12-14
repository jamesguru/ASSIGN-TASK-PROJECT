"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../Controllers/Auth");
const Verifytoken_1 = require("../Middlewares/Verifytoken");
const router = (0, express_1.Router)();
router.post('/register', Auth_1.register);
router.post('/login', Auth_1.login);
router.get('/check', Verifytoken_1.VerifyToken, Auth_1.checkuser);
exports.default = router;
