// require("dotenv").config();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../../../models");

// module.exports = {
//   login: async (req, res, next) => {
//     const { email, password } = req.body;

//     await db.User.findOne({
//       where: { email: email, isActive: "yes", isDelete: "no" },
//       attributes: { exclude: ["createdAt", "updatedAt"] },
//       // include: [
//       //   {
//       //     model: db.Role,
//       //     attributes: {
//       //       exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
//       //     },
//       //   },
//       // ],
//     })
//       .then((user) => {
//         if (!user) {
//           const error = new Error("ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
//           error.status = 404;
//           throw error;
//         }

//         let hash = user.password;
//         // hash = hash.replace(/^\$2y(.+)$/i, "$2b$1");

//         let result = bcrypt.compareSync(password, hash);

//         if (!result) {
//           const error = new Error("ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
//           error.status = 404;
//           throw error;
//         }

//         var authorities = [];
//         user.getRoles().then((roles) => {
//           for (let i = 0; i < roles.length; i++) {
//             authorities.push(roles[i].name);
//           }
//         });

//         const token = jwt.sign(
//           {
//             userId: user.id,
//             email: user.email,
//             roles: authorities,
//           },
//           process.env.JWT_KEY,
//           {
//             expiresIn: "1d",
//           }
//         );

//         res.status(200).json({
//           token: token,
//           expiresIn: 3600 * 24,
//           // userId: user.id,
//         });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   },
// };

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const { User, Role, Profile } = db;

module.exports = {
  // login: async (req, res, next) => {
  //   const { email, password } = req.body;

  //   await db.User.findOne({
  //     where: { email: email, isActive: "yes", isDelete: "no" },
  //   })
  //     .then((user) => {
  //       if (!user) {
  //         const error = new Error("ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
  //         error.status = 404;
  //         throw error;
  //       }

  //       let hash = user.password;
  //       // hash = hash.replace(/^\$2y(.+)$/i, "$2b$1");

  //       let result = bcrypt.compareSync(password, hash);

  //       if (!result) {
  //         const error = new Error("ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
  //         error.status = 404;
  //         throw error;
  //       }

  //       const token = jwt.sign(
  //         {
  //           userId: user.id,
  //           email: user.email,
  //         },
  //         process.env.JWT_KEY,
  //         {
  //           expiresIn: "1d",
  //         }
  //       );

  //       res.status(200).json({
  //         token: token,
  //         expiresIn: 3600 * 24,
  //         userId: user.id,
  //       });
  //     })
  //     .catch((error) => {
  //       next(error);
  //     });
  // },

  signIn: async (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email,
        isActive: "yes",
        isDelete: "no",
      },
      include: [
        {
          model: Role,
          as: "Roles",
        },
        { model: Profile, as: "Profile" },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var authorities = [];
        user.Roles.forEach((role) => {
          authorities.push(role.name);
        });

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            roles: authorities,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).send({
          // id: user.id,
          email: user.email,
          firstname: user.Profile.firstname,
          lastname: user.Profile.lastname,
          roles: authorities,
          accessToken: token,
          // expiresIn: 3600 * 24,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },
};
