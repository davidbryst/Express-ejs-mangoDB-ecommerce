const productSchema = require('../../model/produits');

class ProductController {
    getAllProduct = (req, res) => {
        const url = req.originalUrl;
        productSchema.find()
        .then(products => res.status(200).render('index', {products: products, url: url}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
        // res.render('index', {url: url});
    };

    postProduct = (req, res) => {
        const url = req.originalUrl;
        const { name, description, price, quantity, images } = req.body;
        productSchema({ name, description, price, quantity, images }).save()
        .then(products => res.status(200).json({newPro: products}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
    };

    getProduct = (req, res) => {
        const url = req.originalUrl;
        productSchema.findById({ _id: req.params.id })
        .then(products => res.status(200).json({newPro: products}))
        .catch(err => res.status(400).render('error', {error: err, url: url}));
    };

    putProduct = (req, res) => {
        // thoing
        res.status(200).json("en travail put");
    };

    deleteProduct = (req, res) => {
        // thoing
        res.status(200).json("en travail delete");
    };
}

module.exports = new ProductController();