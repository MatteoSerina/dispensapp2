const Template = require('../models/template');
const imageSearch = require('image-search-google');
const secrets = require('../secrets.ignore');

const client = new imageSearch(secrets.googleCx, secrets.googleApiKey);
const options = { num: 1, searchType: 'image', };

async function addImageUrl(template) {
    const images = await client.search(template.barcode, options);
    template.imageUrl = images[0].url;
    return template;
}

exports.createTemplate = (req, res, next) => {
    client.search(req.body.barcode, options).then(
        (images) => {
            const template = new Template({
                barcode: req.body.barcode.toLowerCase(),
                category: req.body.category.toLowerCase(),
                itemsPerPackage: req.body.itemsPerPackage,
                imageUrl: images[0].url
            });
            template.save().then(
                () => {
                    res.status(201).json({
                        message: 'Template created successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
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

exports.getTemplate = (req, res, next) => {
    Template.findOne({ barcode: req.params.barcode.toLowerCase() })
        .then(
            (template) => {
                res.status(200).json(template);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        )
}

exports.updateTemplate = (req, res, next) => {
    Template.findById(req.params.id).then(
        (currentTemplate) => {
            const template = new Template({
                _id: currentTemplate.id,
                barcode: req.body.barcode.toLowerCase(),
                category: req.body.category.toLowerCase(),
                itemsPerPackage: req.body.itemsPerPackage
            });
            addImageUrl(template).then(
                (template) => {
                    console.log(template);
                    Template.updateOne({ _id: template._id }, template).then(
                        (result) => {
                            if (result.n > 0) {
                                res.status(201).json({
                                    message: 'Template updated successfully'
                                })
                            } else {
                                res.status(404).json({
                                    message: 'Template not found'
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
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error })
        }
    )
}

exports.deleteTemplate = (req, res, next) => {
    Template.findByIdAndDelete(req.params.id).then(
        (result) => {
            console.log(result)
            if (result) {
                res.status(200).json({
                    message: 'Template deleted successfully'
                })
            } else {
                res.status(404).json({
                    message: 'Template not found'
                })
            }
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({ error: error })
        }
    )
}

exports.getAllTemplates = (req, res, next) => {
    Template.find().sort({ category: 1 }).then(
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