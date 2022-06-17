const jwt = require("jsonwebtoken");
const db = require("../models");
const { User, Role } = db;

verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  });
};

isSuperAdmin = async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.userEmail },
    include: { model: Role, as: "Roles" },
  });

  let isAdmin = false;

  const roles = await user.getRoles();

  roles.forEach((role) => {
    if (role.name === "superadmin") {
      isAdmin = true;
    }
  });

  if (isAdmin) {
    next();
    return;
  } else {
    res.status(403).send({
      message: "Require Super Admin Role!",
    });
  }
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Manager Role!",
      });
    });
  });
};

isManagerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isSuperAdmin: isSuperAdmin,
  isManager: isManager,
  isManagerOrAdmin: isManagerOrAdmin,
};
module.exports = authJwt;
