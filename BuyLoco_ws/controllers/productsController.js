const products = require('../models').products_model;
module.exports = {
    list(req, res) {
        return products
            .findAll({})
            .then((products) => res.status(200).send(products))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return products
            .findByPk(req.params.id)
            .then((products) => {
                console.log(products);
                if (!products) {
                    return res.status(404).send({
                        message: 'products Not Found',
                    });
                }
                return res.status(200).send(products);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

};