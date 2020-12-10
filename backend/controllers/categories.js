const Good = require('../models/good');

// @ts-ignore
exports.getCategories = (req, res, next) => {
    Good.distinct('category').then(
        (categories) => {
            console.log(categories);
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