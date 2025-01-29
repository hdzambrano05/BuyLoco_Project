const categories = require('../models').categories_model;
module.exports = {
    list(req, res) {
        return categories
            .findAll({})
            .then((categories) => res.status(200).send(categories))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return categories
            .findByPk(req.params.id)
            .then((categories) => {
                console.log(categories);
                if (!categories) {
                    return res.status(404).send({
                        message: 'categories Not Found',
                    });
                }
                return res.status(200).send(categories);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

};