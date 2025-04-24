const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        size: ["L", "M", "S", "XL", "XXL"],
        colors: ["RED", "GREEN", "BLUE", "YELLOW", "BLACK", "WHITE", "ORANGE", "PURPLE", "INDIGO", "VIOLET"],
        gender: ["MALE","FEMALE","OTHER","GAY","TRANS"]
    })
})

module.exports = router