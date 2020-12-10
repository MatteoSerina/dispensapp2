const Good = require('../models/good');
const Item = require('../models/item');
const imageSearch = require('image-search-google');
const secrets = require('../secrets.ignore');

const client = new imageSearch(secrets.googleCx, secrets.googleApiKey);
const options = { num: 1, searchType: 'image', };

async function addImageUrl(item) {
    const images = await client.search(item.barcode, options);
    item.imageUrl = images[0].url;
    return item;
}

exports.addItem = (req, res, next) => {
    client.search(req.body.barcode.toLowerCase(), options).then(
        (images) => {
            const item = new Item({
                barcode: req.body.barcode.toLowerCase(),
                itemsPerPackage: req.body.itemsPerPackage,
                imageUrl: images[0].url
            });
            Good.findOne({ category: req.params.category }).then(
                (good) => {
                    good.items.push(item);
                    good.save().then(
                        () => {
                            res.status(201).json({
                                message: `Item with barcode ${req.body.barcode} added to category ${req.params.category}!`
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error: error
                            })
                        }
                    )
                }
            ).catch(
                (error) => {
                    res.status(404).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.getGoodByBarcode = (req, res, next) => {
    Good.findOne({ 'items.barcode': req.params.barcode.toLowerCase() })
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

exports.updateItem = (req, res, next) => {
    client.search(req.body.barcode.toLowerCase(), options).then(
        (images) => {
            Good.findOneAndUpdate({ 'items.barcode': req.params.barcode.toLowerCase() }, {
                '$set': {
                    'items.$.barcode': req.body.barcode.toLowerCase(),
                    'items.$.itemsPerPackage': req.body.itemsPerPackage,
                    'items.$.imageUrl': images[0].url
                }
            }, function (err, post) {
                if (err) {
                    res.status(404).json({
                        message: `Item with barcode ${req.body.barcode.toLowerCase()} not found`
                    })
                } else {
                    res.status(201).json({
                        message: `Item with barcode ${req.body.barcode.toLowerCase()} updated successfully`
                    });
                }
            })
        }).catch((
            (err) => {
                console.log(err);
                Good.findOneAndUpdate({ 'items.barcode': req.params.barcode.toLowerCase() }, {
                    '$set': {
                        'items.$.barcode': req.body.barcode.toLowerCase(),
                        'items.$.itemsPerPackage': req.body.itemsPerPackage,
                    }
                }, function (err, post) {
                    if (err) {
                        res.status(404).json({
                            message: `Item with barcode ${req.body.barcode.toLowerCase()} not found`
                        })
                    } else {
                        res.status(201).json({
                            message: `Item with barcode ${req.body.barcode.toLowerCase()} updated successfully`
                        });
                    }
                })
            }
        ))
}

exports.deleteItem = (req, res, next) => {
    Good.findOneAndUpdate(
        { 'items.barcode': req.params.barcode.toLowerCase() },
        { $pull: { items: { barcode: req.params.barcode.toLowerCase() } } },
        { new: true },
        function (error) {
            if (error) {
                console.log(error)
                res.status(400).json({
                    error: error
                })
            }
            res.status(200).json({
                message: `Item with barcode ${req.params.barcode} removed!`
            });
        }
    )
}
