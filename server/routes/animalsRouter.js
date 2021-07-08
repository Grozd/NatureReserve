const {Router} = require('express');
const router = Router();
const Product = require('../model/exempleDB.json');

router.get('/', (req, res) => {
    
    res.status(200).json({prod:Product});
});

module.exports  = router;
