const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization == undefined) {
      return res.status(401).send({
        errors: {
          common: {
            message: "Unauthorized Access!",
          },
        },
      });
    }

    if (req.headers.authorization != "null") {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = decoded;
      next();
    } else {
      return res.status(401).send({
        errors: {
          common: {
            message: "Unauthorized Access!",
          },
        },
      });
    }
  } catch (err) {
    res.status(401).send({
      errors: {
        common: {
          message: err.message,
        },
      },
    });
  }
};

// user sign in token
const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = { isAuth, signInToken };
