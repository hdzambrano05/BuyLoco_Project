const { RelationshipType } = require('sequelize/lib/errors/database/foreign-key-constraint-error');
const usersController = require('./usersController');
const { add } = require('./usersController');

const reviews = require('../models').reviews_model;
module.exports = {
    list(req, res) {
        return reviews
            .findAll({})
            .then((reviews) => res.status(200).send(reviews))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return reviews
            .findByPk(req.params.id)
            .then((reviews) => {
                console.log(reviews);
                if (!reviews) {
                    return res.status(404).send({
                        message: 'reviews Not Found',
                    });
                }
                return res.status(200).send(reviews);
            })
            .catch((error) =>
                res.status(400).send(error));
    },


    add(req, res) {
        return reviews
            .create({
                users_id: req.body.users_id,
                product_id: req.body.product_id,
                rating: req.body.rating,
                comment: req.body.comment,
            })
            .then((reviews) => res.status(201).send(reviews))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return reviews
            .findByPk(req.params.id)
            .then(reviews => {
                if (!reviews) {
                    return res.status(404).send({
                        message: 'reviews Not Found',
                    });
                }
                return reviews
                    .update({
                        users_id: req.body.users_id || reviews.users_id,
                        product_id: req.body.product_id || reviews.product_id,
                        rating: req.body.rating || reviews.rating,
                        comment: req.body.comment || reviews.comment,
                    })
                    .then(() => res.status(200).send(reviews))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return reviews
            .findByPk(req.params.id)
            .then(reviews => {
                if (!reviews) {
                    return res.status(400).send({
                        message: 'reviews Not Found',
                    });
                }
                return reviews
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },




};