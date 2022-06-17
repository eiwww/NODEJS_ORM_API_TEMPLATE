const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { authJwt, verifySignUp } = require("../../../../middlewares");

router.post("/create-super-admin", controller.createSuperAdmin); // create super admin
router.get(
  "/roles",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.getAllRoles
);
router.get(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.readAllUsers
);
router.get(
  "/:userId",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.readUserById
);
router.post(
  "/change-password",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.changePassword
);
router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isSuperAdmin,
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted,
  ],
  controller.createNewUser
); // create user

router.put(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin, verifySignUp.checkRolesExisted],
  controller.update
);

router.post(
  "/delete",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.delete
);

module.exports = router;
