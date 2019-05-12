const express = require('express'),
    yer = require('../models/yer');
    router = express.Router();

//DB'de olan butun yerleri JSON olarak gonder
router.get("/", (req, res) => {
    yer.find()
        .then((yerlerDB) => {   //Promise sayesinde
            res.json(yerlerDB);
        }).catch((err) => {
            console.log("=================ERROR=================");
            console.log(err);
            res.send(err);
        });
});

//DB'ye yeni yer eklemek için kullanılan route
router.post("/", (req, res) => {
    console.log(req.body);
    yer.create(req.body)
        .then((yeniYer) => {
            res.status(201).json(yeniYer);
        }).catch((err) => {
            console.log("=================ERROR=================");
            console.log(err);
            res.send(err);
        });
});

//Show Route - ozel olarak secilmis datanin detayli bilgisini gosteren route
router.get("/:yerID", (req, res) => {
    yer.findById(req.params.yerID)
        .then((bulunanYer) => {
            res.json(bulunanYer);
        }).catch((err) => {
            console.log("=================ERROR=================");
            console.log(err);
            res.send(err);
        });
});

//Update Route - Guncelleme Route (ziyaret edildi islemi)
router.put("/:yerID", (req, res) => {
    yer.findByIdAndUpdate({ _id: req.params.yerID }, req.body, { new: true })
        .then((yer) => {
            res.json(yer);
        }).catch((err) => {
            console.log("=================ERROR=================");
            console.log(err);
            res.send(err);
        });
});

//Remove Route - Silme Route
router.delete("/:yerID", (req, res) => {
    yer.remove({ _id: req.params.yerID})
        .then(() => {
            res.json({message: "Remove operation successful"});
        }).catch((err) => {
            console.log("=================ERROR=================");
            console.log(err);
            res.send(err);
        });
});

module.exports = router;