const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                createdAt: Date.now()
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: 'User not found'
                })
            }
            // @ts-ignore
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password' })
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({
                        userId: user._id,
                        username: user.username,
                        token: token
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({ error: error });
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({ error: error });
        }
    )
}