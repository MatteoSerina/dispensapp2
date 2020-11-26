const Good = require('../models/good');
const fs = require('fs');

exports.createGood = (req, res, next) => {
    const good = new Good({
        category: req.body.category.toLowerCase(),
        quantity: req.body.quantity
    });
    good.save().then(
        () => {
            res.status(201).json({
                message: 'Good created successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.updateGood = (req, res, next) => {
    Good.findOne({ category: req.params.category.toLowerCase() }).then(
        (currentGood) => {
            const newQuantity = parseInt(currentGood.quantity) + parseInt(req.body.delta);
            if (newQuantity < 0) {
                return res.status(409).json({
                    message: `Quantity cannot be below zero, update aborted. Current quantity: ${currentGood.quantity}`
                })
            }
            const good = new Good({
                _id: currentGood._id,
                category: req.params.category.toLowerCase(),
                quantity: newQuantity
            });
            Good.updateOne({ category: req.params.category.toLowerCase() }, good).then(
                (result) => {
                    if (result.n > 0) {
                        res.status(201).json({
                            message: 'Good updated successfully'
                        })
                    } else {
                        res.status(404).json({
                            message: 'Good not found'
                        })
                    }
                }
            ).catch(
                (error) => {
                    res.status(400).json({ error: error })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error })
        }
    )
};

exports.getGood = (req, res, next) => {
    Good.findOne({ category: req.params.category.toLowerCase() })
        .then(
            (good) => {
                res.status(200).json(good);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        )
}

exports.deleteGood = (req, res, next) => {
    Good.findOne({ category: req.params.category.toLowerCase() }).then(
        (good) => {
            Good.deleteOne({ _id: good.id }).then(
                (result) => {
                    if (result.deletedCount > 0) {
                        res.status(200).json({
                            message: 'Good deleted successfully'
                        })
                    } else {
                        res.status(404).json({
                            message: 'Good not found'
                        })
                    }
                }
            ).catch(
                (error) => {
                    res.status(400).json({ error: error })
                }
            )
        })
}

exports.getAllGoods = (req, res, next) => {
    Good.find().then(
        (templates) => {
            res.status(200).json(templates);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}