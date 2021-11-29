
 function admin(req, res, next){
    // const token = req.header('x-auth-token');
    // if (!token.isAdmin) return res.status(403).send('Access Denied!');
    if (!req.header.isAdmin) return res.status(403).send('Access Denied!');
    next();
}

exports.admin = admin;