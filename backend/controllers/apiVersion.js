const pjson = require('../package.json');

// @ts-ignore
exports.getVersion = (req, res, next) => {
    res.status(200).json({
        version: pjson.version
    })
}