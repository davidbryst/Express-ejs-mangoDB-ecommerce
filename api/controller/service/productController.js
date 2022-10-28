const productSchema = require('../../model/produits');

class ProductController {
    postProduct = (req, res) => {
        const url = req.originalUrl;
        const { name, description, price, quantity, section } = req.body;
        var images = [];
        req.files.forEach(element => {
            element = element.path.split('\\');
            images.push(element[element.length-1])
        });
        console.log(images);
        productSchema({ name, description, price, quantity, images, section }).save()
        .then(products => res.status(200).redirect('/auth/dash'))
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