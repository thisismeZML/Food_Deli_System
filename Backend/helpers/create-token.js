const jwt = require('jsonwebtoken');

const createToken = (userId, userRole) => {
  return jwt.sign(
    { _id: userId, role: userRole },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
};

module.exports = createToken;
