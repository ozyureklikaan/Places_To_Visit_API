const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/GezilecekYerler");
mongoose.set("debug", true);

mongoose.Promise = Promise;

const yerSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: "Yer ismi bos olamaz"
    },
    ziyaret: {
        type: Boolean,
        default: false
    },
    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("yer", yerSchema);