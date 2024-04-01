const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    console.log("................................" + req.body);
    if (!token) return res.status(401).json({ error: 'Enter the token.........' });

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        req.userRoles = decoded.userRoles;

        next();
        if (req.userRoles == 'admin') {

        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.......' });
    }
};

module.exports = verifyToken;
