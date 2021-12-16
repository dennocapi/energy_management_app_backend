exports.requireUser = (req, res, next) => {
 
  if (!req.user) {
    return res.status(403).json({message: "Invalid session"});
  }

  return next();
}

