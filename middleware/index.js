var jwt = require('jsonwebtoken');
const { URL } = require('url');
const authMiddleware = (req, res, next) => {

    if(req.method != 'GET') {
        if(req.query.API_KEY === process.env.API_KEY){
             next();
        }else{ res.status(403).json({message:"Invalid API key"})
    }
    }else {
        next();
    }
}
const allowed_access = ['/api/user/login']
const isPassUrl =(url) => {
    for(let i = 0; i < allowed_access.length; i++) {
        if(url.toLowerCase() === allowed_access[i]) {
            return true;
        }
    }
    console.log("pass url failed")
    return false;
}
const authorizationJwt =  (req, res, next) => {
    const token = req.headers.authorization;
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    console.log(url)
    if(isPassUrl(url.pathname)) {
        return next()
    }
    
    if(!token) {
        return res.status(403).json({message: 'token is required'})
    } 
    const parseToken = token.split(' ')[1]
    if(parseToken) {
        jwt.verify(parseToken, process.env.SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).json({message: 'token not correct'})
            }
            req.user = decoded.data;
            console.log(decoded.data)
            next();
            
          });
    }
 
}
const authMiddlewareView = (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/login')
    }
        next();
    
}

module.exports = {authMiddleware, authorizationJwt, authMiddlewareView} ;