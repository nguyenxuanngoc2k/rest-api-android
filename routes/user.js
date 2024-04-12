const express = require('express');
const useRoute = express.Router();
const UserModel = require('../models/user-schema');
const userSchema = require('../models/user-schema');
const { createUser, loginUser} = require("../controller/user");
const acccount = [
    { "username": "admin", "password": "123456" },
    { "username": "user", "password": "123456" },
    { "username": "qoqzrl", "password": "b929mpcr" },
    { "username": "xhsonk", "password": "yhf7aw23" },
    { "username": "ivzfqw", "password": "zgofwozp" },
    { "username": "hhtuyr", "password": "8eyzpb3i" },
    { "username": "jxlaol", "password": "nqr5qiim" },
    { "username": "cvypof", "password": "qb8nktg2" },
    { "username": "lwksvm", "password": "cc4s2vk9" },
    { "username": "qtufew", "password": "oumwyl2s" }
]
useRoute.get('/', function (req, res) {
    return res.json({ data: acccount })
})

useRoute.post('/login', function (req, res) {
    return loginUser(req, res)
})
// ĐĂNG KÝ
useRoute.post('/register', async function (req, res) {
    return createUser(req, res )

})
// DELETE
useRoute.delete('/:userID', async function (req, res) {
    const { userID } = req.params;
    await userSchema.deleteOne({ _id: userID })
    return res.json({
        message: 'Xóa thành công'
    })

})
// UPDATE 
useRoute.put('/:userID', async function (req, res) {
    const { userID } = req.params;
    const { username, password } = req.body;
    const updateData = { username, password };
    await UserModel.findByIdAndUpdate({ _id: userID }, updateData)
    return res.json({
        message: 'Cập nhật thành công'
    })

})


module.exports = useRoute;

