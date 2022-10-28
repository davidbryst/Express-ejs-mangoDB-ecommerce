const productSchema = require('../../model/produits');

class Page {
    getIndex = (req, res) => {
        productSchema.find()
        .then(products => res.status(200).render('index', {products: products}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
        // res.render('index', {url: url});
    };

    getShop = (req, res) => {
        const url = req.originalUrl;
        productSchema.find()
        .then(products => res.status(200).render('shop', {products: products}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
    };

    getSingle = (req, res) => {
        productSchema.findById({ _id: req.params.id })
        .then(product => res.status(200).render('single', {product: product}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
    };

    getError = (req, res) => {
        const error = req.params.error;
        res.render('error', {error: error});
    };
}

module.exports = new Page();