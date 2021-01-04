const Good = require('../models/good');
const Item = require('../models/item');

const goodsDataFetcher = require('../services/goodsDataFetcher');


async function addImageUrl(item) {
    const itemData = await goodsDataFetcher.getGoodsData(item.barcode);
    item.imageUrl = itemData.imageUrl;
    return item;
}

exports.addItem = (req, res, next) => {
    goodsDataFetcher.getGoodsData(req.body.barcode.toLowerCase()).then(
        (itemData) => {
            let imageUrl;
            try {
                imageUrl = itemData.imageUrl;
            } catch (error) {
                imageUrl = null;
            }
            const item = new Item({
                barcode: req.body.barcode.toLowerCase(),
                itemsPerPackage: req.body.itemsPerPackage,
                imageUrl: imageUrl
            });
            Good.findOne({ category: req.params.category, userId: res.locals.userId }).then(
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
                            console.error(error);
                            res.status(400).json({
                                error: error
                            })
                        }
                    )
                }
            ).catch(
                (error) => {
                    console.error(error);
                    res.status(404).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            console.error(error);
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.getGoodByBarcode = (req, res, next) => {
    Good.findOne({ 'items.barcode': req.params.barcode.toLowerCase(), userId: res.locals.userId }, "category quantity items.$:1")
        .then(
            (good) => {
                if (good === null) {
                    res.status(404).json({ message: 'Item not found' });
                } else {
                    res.status(200).json(good);
                }
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
    goodsDataFetcher.getGoodsData(req.body.barcode.toLowerCase()).then(
        (itemData) => {
            Good.findOneAndUpdate({ 'items.barcode': req.params.barcode.toLowerCase(), userId: res.locals.userId }, {
                '$set': {
                    'items.$.barcode': req.body.barcode.toLowerCase(),
                    'items.$.itemsPerPackage': req.body.itemsPerPackage,
                    'items.$.imageUrl': itemData.imageUrl
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
                Good.findOneAndUpdate({ 'items.barcode': req.params.barcode.toLowerCase(), userId: res.locals.userId }, {
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
        { 'items.barcode': req.params.barcode.toLowerCase(), userId: res.locals.userId },
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
