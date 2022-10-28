const Cart = require('../../model/cart');
const productSchema = require('../../model/produits');

class CartController {
    getCartItems = (req, res) => {
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart = cart.getItems();
        res.status(200).render('cart', {cart: cart});
    };

    postCartItem = (req, res) => {
        const id = req.params.id;
        productSchema.findById({_id: id})
        .then(product => {
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            cart.add(product, id);
            console.log(cart);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/single/'+id);
        })
        .catch(err => res.render('error', {error: err}));
    };

    deleteCartItem = (req, res) => {
        const id = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.remove(id);
        req.session.cart = cart;
        res.redirect('/cart');
    };
}

module.exports = new CartController();