const jwt = require('jsonwebtoken');
let cfg = require('../config/db.config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
     return next()
  } 
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) { return res.status(401).json({message:'Auth error token'}) }
    const decoded = jwt.verify(token, cfg.secret);
    req.user = decoded;
    next()
} catch (e) {
    return res.status(401).json({message: 'Auth error why?'})
}
}
