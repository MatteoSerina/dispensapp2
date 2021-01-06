const Good = require('../models/good');

// @ts-ignore
exports.getCategories = (req, res, next) => {
    Good.find({ userId: res.locals.userId }).distinct('category').then(
        (categories) => {
            res.status(200).json(categories);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}