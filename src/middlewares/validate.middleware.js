const { z } = require("zod");

const validateMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};

module.exports = validateMiddleware;