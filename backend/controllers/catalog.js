const Template = require('../models/template');
const fs = require('fs');

exports.createTemplate = (req, res, next) => {
    const template = new Template({
        barcode: req.body.barcode.toLowerCase(),
        category: req.body.category.toLowerCase(),
        itemsPerPackage: req.body.itemsPerPackage
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
    Template.findOne({ barcode: req.params.barcode.toLowerCase() }).then(
        (currentTemplate) => {
            const template = new Template({
                _id: currentTemplate.id,
                barcode: req.params.barcode.toLowerCase(),
                category: req.body.category.toLowerCase(),
                itemsPerPackage: req.body.itemsPerPackage
            });
            Template.updateOne({ _id: currentTemplate.id }, template).then(
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

exports.deleteTemplate = (req, res, next) => {
    Template.findOne({ barcode: req.params.barcode.toLowerCase() }).then(
        (thing) => {
            Template.deleteOne({ barcode: req.params.barcode.toLowerCase() }).then(
                (result) => {
                    if (result.deletedCount > 0) {
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
                    res.status(400).json({ error: error })
                }
            )
        })
}

exports.getAllTemplates = (req, res, next) => {
    Template.find().then(
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