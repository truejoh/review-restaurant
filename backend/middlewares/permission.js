module.exports = (permission) => (req, res, next) => {
  const { user } = req;

  if (user && Array.isArray(permission) && !permission.includes(user.role)) {
    return res.status(403).json({
      success: false,
      msg: 'You are not authorized to do this action',
    });
  }

  next();
};
