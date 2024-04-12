const express = require('express');
const useRoute = express.Router();
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
    return res.json({data:acccount})
  })

useRoute.post('/login', function (req, res) {

    const { username, password } = req.body;
    const user = acccount.find(acccount => acccount.username === username && acccount.password === password);
    if (user) {
        res.status(200).json({
            'message': 'Đăng nhập thành công'
        })
    } else {
        res.status(401).json({
            'message': 'Tên đăng nhập hoặc mật khẩu không chính xác'
        })
    }


    // return res.status(400).json({
    //     'message':'call user'
    // })
})
// ĐĂNG KÝ
useRoute.post('/register', function (req, res) {
    const { username, password, email } = req.body;
    const checkUser = acccount.find((acccount) => {
        return acccount.username === username
    })
    if (checkUser) {
        return res.status(400).json({
            'message': 'Tên đăng nhập đã tồn tại'
        })
    }

    if (username == "" || password == "" || email == "") {
        res.status(400).json({
            'message': 'Vui lòng nhập đầy đủ thông tin'
        })
    }

    else {
        acccount.push({ username, password, email })
        res.status(200).json({
            'message': 'Đăng ký thành công'
        })
    }
})
// DELETE
useRoute.delete('/:username', function (req, res) {
    const { username } = req.params;
    const index = acccount.findIndex(
        (acccount) => acccount.username === username)
    if (index === -1) {
         res.status(400).json({
            'message': 'Tên đăng nhập không tồn tại'
        })
    }
    acccount.splice(index, 1)
    res.status(200).json({
        'message': 'Xóa thành công'
    })
})
// UPDATE 
useRoute.put('/:username',function (req, res){
    const username = req.body.username;
    const password = req.body;
    const newPassword = req.body;
    const userIndex = acccount.findIndex((acccount) => acccount.username === username);
    if(userIndex > -1){
        acccount[userIndex].password = newPassword;
        res.status(200).json({
           'message': 'Cập nhật thành công'
        })
    }
    else {
        res.status(400).json({
          'message': 'Tên đăng nhập không tồn tại'
        })
    }
    
})


module.exports = useRoute;