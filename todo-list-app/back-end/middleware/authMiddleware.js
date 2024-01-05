// authMiddleware.js
const requireAuth = (req, res, next) => {
    console.log('Initial Session:', req.session); // Log the initial session
    console.log('Session:', req.session); // Log the session object for debugging

    if (req.session && req.session.userId) {
        console.log('Authenticated User:', req.session.userId); // Log the authenticated user
        next();
    } else {
        console.log('Unauthorized Access'); // Log unauthorized access
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { requireAuth };
