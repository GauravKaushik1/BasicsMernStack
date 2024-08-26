const router = require('express').Router();

router.get('/', (req, res) => {
    res
    .status(200)
    .send("Home Page is this");
});


module.exports = router;