const jwt = require('jsonwebtoken');
let cfg = require('../config/db.config');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
     return next()
  } 
  try {
    const token = await req.headers.authorization.split(' ')[1]
    if (!token) { return res.status(401).json({message:'Auth error token'}) }
    const decoded = await jwt.verify(token, cfg.secret);
    req.user = decoded;
    next()
} catch (e) {
    return res.status(401).json({message: 'Auth error why?'})
}
}
