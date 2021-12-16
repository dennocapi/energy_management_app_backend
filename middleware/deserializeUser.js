const {
  signJWT,
  verifyJWT
} = require("../utils/jwt.utils")
const {
  getSession
} = require("../db")

function deserializeUser(req, res, next) {

  const {
    accessToken,
    refreshToken
  } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const {
    payload,
    expired
  } = verifyJWT(accessToken);

  // For a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // expired but valid access token
  const {
    payload: refresh
  } = expired && refreshToken ? verifyJWT(refreshToken) : {
    payload: null
  }

  console.log('This is refresh')
  console.log(refresh)
  if (!refresh) {
    return next();
  }

  const session = getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, "30d");
  console.log(newAccessToken)
  res.cookie("accessToken", newAccessToken, {
    maxAge: 2.678e+12, // 31 days
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'development'
  });

  req.user = verifyJWT(newAccessToken).payload;

  return next();
}

module.exports = deserializeUser