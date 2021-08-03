$(() => {
    for (let index = 0; index < $('.prodDB').length; index++) {
        const addCart = $('.prodDB .fa-cart-plus').parent().eq(index);
        const product = $(".prodDB input[type='hidden']").eq(index).val();
        console.log(typeof product);
        addCart.click((e) => {
            e.preventDefault();

            fetch('/', {
                method: 'POST',
                body: JSON.parse(product),
                headers: {'Content-Type': 'application/json'}
            });
        });
    }
});