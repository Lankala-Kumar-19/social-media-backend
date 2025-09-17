"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = getAllUser;
exports.createUser = createUser;
const User_1 = require("../models/User");
async function getAllUser(req, res, next) {
    try {
        const user = await User_1.UserModel.find();
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}
async function createUser(req, res, next) {
    try {
        const user = req.body;
        const exists = await User_1.UserModel.findOne({ email: user.email });
        if (exists) {
            return res.status(409).json({ msg: `user already exist with this email ` });
        }
        const created = await User_1.UserModel.create(user);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=userService.js.map