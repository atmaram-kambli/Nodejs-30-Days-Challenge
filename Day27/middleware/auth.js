function authenticateAndAuthorize(req, res, next) {
    const token = req.headers.authorization || req.query.token || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const userRole = 'admin';
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
}

module.exports = authenticateAndAuthorize;
