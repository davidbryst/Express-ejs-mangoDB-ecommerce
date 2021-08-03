const productSchema = require('../../model/produits');

class ProductController {
    getAllProduct = (req, res) => {
        const url = req.originalUrl;
        let products = 0;
        productSchema.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
        //res.render('index', {products: products, url: url});
    };

    getOneProduct = (req, res) => {
        const url = req.originalUrl;
        let product = 0;
        productSchema.findById({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    };
}

module.exports = ProductController();