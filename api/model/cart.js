module.exports = class {
    constructor(cart) {
        this.items = cart.items || {};
        this.totalItems = cart.totalItems || 0;
        this.totalPrice = cart.totalPrice || 0;
    }

    add = (item, id) => {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.items[id] = cartItem;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
    };

    remove = (id) => {
        this.totalItems --;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    getItems = () => {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}
