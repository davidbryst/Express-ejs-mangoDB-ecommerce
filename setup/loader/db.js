const mongoose = require('mongoose');
module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/Ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}