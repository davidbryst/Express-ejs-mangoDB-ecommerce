const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'upload','img'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const date = new Date();
        cb(null, date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + '_' + file.originalname);
    }
});

module.exports = multer({storage: storage});