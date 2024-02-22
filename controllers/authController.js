const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const register = (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
    });
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to register user', error: err });
        }
        return res.status(201).json({ message: 'User registered successfully', user });
    });
};

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: 'Invalid credentials' }); }
        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
        return res.json({ token });
    })(req, res, next);
};

const getCurrentUser = (req, res) => {
    res.json(req.user);
};

module.exports = {
    register,
    login,
    getCurrentUser
};
