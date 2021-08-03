const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    create: function (req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err)
                next(err)
            else
                res.json({ status: 'success', message: 'user added succesfully!', data: null })
        })
    },

    authenticate: function (req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err)
            } else {
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' })
                    // res.send({status:'success', message: 'user found!', data:{ user:userInfo, token:token}})
                    res.send({ token: token, id: userInfo._id, name: userInfo.name })
                } else {
                    res.send({ status: 'error', message: 'invalid email/password!', data: userInfo })
                }
            }
        })
    },
}