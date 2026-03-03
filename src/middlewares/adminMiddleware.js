export const adminAuth = (req, res, next) => {
    if (req.session.user && req.session.user.username === 'admin') {
        next();
    } else {
        res.redirect('/login');
    }
};