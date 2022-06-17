const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../../models");
const Op = db.Sequelize.Op;
const { User, Role, Profile } = db;

module.exports = {
  getAllRoles: async (req, res, next) => {
    const roles = await Role.findAll();

    try {
      res.status(200).json({
        roles,
      });
    } catch (error) {
      next(error);
    }
  },

  createNewUser: async (req, res, next) => {
    const {
      email,
      password,
      roles,
      firstname,
      lastname,
      gender,
      phone,
      provinceId,
      districtId,
      village,
    } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let hashPassword = bcrypt.hashSync(password, 10);

      const user = await User.create(
        {
          id: uuidv4(),
          email,
          password: hashPassword,
        },
        { transaction: t }
      );

      const isRoles = await Role.findAll({
        where: { id: { [Op.in]: roles } },
      });

      await user.setRoles(isRoles, { transaction: t });

      await Profile.create(
        {
          userId: user.id,
          firstname,
          lastname,
          gender,
          phone,
          provinceId,
          districtId,
          village,
          createdBy: req.userId,
          updatedBy: req.userId,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(201).json({
        message: "ການເພີ່ມສໍາເລັດ",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  readAllUsers: async (req, res, next) => {
    try {
      let users = await User.findAll({
        where: { isDelete: "no" },
        attributes: { exclude: ["password"] },
        include: [
          { model: Profile, foreignKey: "userId", as: "Profile" },
          { model: Role, as: "Roles", attributes: ["id", "name"] },
        ],
      });

      // if (!users) {
      //   const error = new Error("ຍັງບໍ່ມີຂໍ້ມູນ");
      //   error.status = 403;
      //   throw error;
      // }

      // console.log(users.length);

      userList = [];

      users.forEach((item) => {
        var authorities = [];
        var authorityIds = [];
        item.Roles.forEach((role) => {
          authorityIds.push(role.id);
          authorities.push(role.name);
        });
        userList.push({
          id: item.id,
          email: item.email,
          isActive: item.isActive,
          isDelete: item.isDelete,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          profile: {
            id: item.Profile.id,
            firstname: item.Profile.firstname,
            lastname: item.Profile.lastname,
            gender: item.Profile.gender,
            phone: item.Profile.phone,
            provinceId: item.Profile.provinceId,
            districtId: item.Profile.districtId,
            village: item.Profile.village,
            createdAt: item.Profile.createdAt,
            updatedAt: item.Profile.updatedAt,
            createdBy: item.Profile.createdBy,
            updatedBy: item.Profile.updatedBy,
          },
          roles: authorities,
          roleIds: authorityIds,
        });
      });

      res.status(200).json({
        users: userList,
      });
    } catch (error) {
      next(error);
    }
  },

  readUserById: async (req, res, next) => {
    const userId = req.params.userId;

    try {
      let user = await User.findOne({
        where: { isDelete: "no", id: userId },
        attributes: { exclude: ["password"] },
        include: [
          { model: Profile, foreignKey: "userId", as: "Profile" },
          { model: Role, as: "Roles", attributes: ["id", "name"] },
        ],
      });

      if (!user) {
        const error = new Error("ໄອດີບໍ່ຖືກ");
        error.status = 404;
        throw error;
      }

      var authorities = [];
      var authorityIds = [];
      user.Roles.forEach((role) => {
        authorityIds.push(role.id);
        authorities.push(role.name);
      });

      userModify = {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        isDelete: user.isDelete,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profile: {
          id: user.Profile.id,
          firstname: user.Profile.firstname,
          lastname: user.Profile.lastname,
          gender: user.Profile.gender,
          phone: user.Profile.phone,
          provinceId: user.Profile.provinceId,
          districtId: user.Profile.districtId,
          village: user.Profile.village,
          createdAt: user.Profile.createdAt,
          updatedAt: user.Profile.updatedAt,
          createdBy: user.Profile.createdBy,
          updatedBy: user.Profile.updatedBy,
        },
        roles: authorities,
        roleIds: authorityIds,
      };

      res.status(200).json({
        user: userModify,
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    const { userId, email, password } = req.body;

    const t = await db.sequelize.transaction();

    try {
      const user = await User.findOne(
        {
          where: { id: userId, email },
        },
        { transaction: t }
      );

      if (!user) {
        const error = new Error("ຂໍ້ມູນທີ່ໃສ່ມາບໍ່ຖືກຕ້ອງ");
        error.status = 404;
        throw error;
      }

      let hashPassword = bcrypt.hashSync(password, 10);
      await user.update(
        {
          password: hashPassword,
          updatedBy: req.userId,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({ message: "ປ່ຽນລະຫັດຜ່ານສໍາເລັດ" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  update: async (req, res, next) => {
    const {
      userId,
      email,
      roles,
      firstname,
      lastname,
      gender,
      phone,
      provinceId,
      districtId,
      village,
    } = req.body;

    const t = await db.sequelize.transaction();

    try {
      const user = await User.findOne(
        {
          where: { id: userId, email: email },
        },
        { transaction: t }
      );

      if (!user) {
        const error = new Error("ຂໍ້ມູນທີ່ໃສ່ມາບໍ່ຖືກຕ້ອງ");
        error.status = 404;
        throw error;
      }

      const isRoles = await Role.findAll({
        where: { id: { [Op.in]: roles } },
      });

      await user.setRoles([], { transaction: t });

      await user.setRoles(isRoles, { transaction: t });

      const profile = await Profile.findOne(
        {
          where: { userId: user.id },
        },
        { transaction: t }
      );

      await profile.update(
        {
          firstname,
          lastname,
          gender,
          phone,
          provinceId,
          districtId,
          village,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { userId, email } = req.body;

    const t = await db.sequelize.transaction();

    try {
      const user = await User.findOne(
        {
          where: { id: userId, email: email },
        },
        { transaction: t }
      );

      if (!user || user.isDelete === "yes") {
        const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
        error.status = 404;
        throw error;
      }

      await user.update(
        {
          isDelete: "yes",
          updatedBy: req.userId,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({ message: "ລຶບສໍາເລັດ" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  createSuperAdmin: async (req, res, next) => {
    const {
      email,
      password,
      roles,
      firstname,
      lastname,
      gender,
      phone,
      provinceId,
      districtId,
      village,
    } = req.body;

    // console.log(req.body);
    let userId = uuidv4();

    // Province.bulkCreate([
    //   {
    //     name: "ນະຄອນຫຼວງວຽງຈັນ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   {
    //     name: "ຜົ້ງສາລີ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   {
    //     name: "ຫຼວງນ້ຳທາ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 3
    //   {
    //     name: "ອຸດົມໄຊ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 4
    //   {
    //     name: "ບໍ່ແກ້ວ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 5
    //   {
    //     name: "ຫຼວງພະບາງ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 6
    //   {
    //     name: "ຫົວພັນ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   {
    //     name: "ໄຊຍະບູລີ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 8
    //   {
    //     name: "ຊຽງຂວາງ",
    //     section: "north",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 9
    //   {
    //     name: "ວຽງຈັນ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 10
    //   {
    //     name: "ບໍລິຄຳໄຊ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 11
    //   {
    //     name: "ຄຳມ່ວນ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 12
    //   {
    //     name: "ສະຫວັນນະເຂດ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 13
    //   {
    //     name: "ສາລະວັນ",
    //     section: "south",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 14
    //   { name: "ເຊກອງ", section: "south", createdBy: userId, updatedBy: userId }, // 15
    //   {
    //     name: "ຈຳປາສັກ",
    //     section: "south",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 16
    //   {
    //     name: "ອັດຕະປື",
    //     section: "south",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 17
    //   {
    //     name: "ໄຊສົມບູນ",
    //     section: "center",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 18
    // ]);

    // District.bulkCreate([
    //   // 1. ນະຄອນຫຼວງວຽງຈັນ
    //   {
    //     provinceId: 1,
    //     name: "ຈັນທະບູລີ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   {
    //     provinceId: 1,
    //     name: "ສີໂຄດຕະບອງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   { provinceId: 1, name: "ໄຊເສດຖາ", createdBy: userId, updatedBy: userId }, // 3
    //   {
    //     provinceId: 1,
    //     name: "ສີສັດຕະນາກ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 4
    //   { provinceId: 1, name: "ນາຊາຍທອງ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 1, name: "ໄຊທານີ", createdBy: userId, updatedBy: userId }, // 6
    //   {
    //     provinceId: 1,
    //     name: "ຫາດຊາຍຟອງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   { provinceId: 1, name: "ສັງທອງ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 1, name: "ປາກງື່ມ", createdBy: userId, updatedBy: userId }, // 9
    //   // 2. ຜົ້ງສາລີ
    //   { provinceId: 2, name: "ຜົ້ງສາລີ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 2, name: "ໃໝ່", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 2, name: "ຂວາ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 2, name: "ສໍາພັນ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 2, name: "ບຸນເໜືອ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 2, name: "ຍອດອູ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 2, name: "ບຸນໃຕ້", createdBy: userId, updatedBy: userId }, // 7
    //   // 3. ຫຼວງນໍ້າທາ
    //   {
    //     provinceId: 3,
    //     name: "ຫຼວງນໍ້າທາ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   { provinceId: 3, name: "ສິງ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 3, name: "ລອງ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 3, name: "ວຽງພູຄໍາ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 3, name: "ນາແລ", createdBy: userId, updatedBy: userId }, // 5
    //   // 4. ອຸດົມໄຊ
    //   { provinceId: 4, name: "ໄຊ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 4, name: "ຫຼາ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 4, name: "ນາໝໍ້", createdBy: userId, updatedBy: userId }, //3
    //   { provinceId: 4, name: "ງາ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 4, name: "ແບງ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 4, name: "ຮຸນ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 4, name: "ປາກແບ່ງ", createdBy: userId, updatedBy: userId }, // 7
    //   // 5. ບໍ່ແກ້ວ
    //   { provinceId: 5, name: "ຫ້ວຍຊາຍ", createdBy: userId, updatedBy: userId }, // 1
    //   {
    //     provinceId: 5,
    //     name: "ຕົ້ນເຜິ້ງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   { provinceId: 5, name: "ເມິງ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 5, name: "ຜາອຸດົມ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 5, name: "ປາກທາ", createdBy: userId, updatedBy: userId }, // 5
    //   // 6. ຫຼວງພະບາງ
    //   {
    //     provinceId: 6,
    //     name: "ນະຄອນຫຼວງພະບາງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   { provinceId: 6, name: "ຊຽງເງິນ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 6, name: "ນານ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 6, name: "ປາກອູ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 6, name: "ນໍ້າບາກ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 6, name: "ງອຍ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 6, name: "ປາກແຊງ", createdBy: userId, updatedBy: userId }, // 7
    //   { provinceId: 6, name: "ໂພນໄຊ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 6, name: "ຈອມເພັດ", createdBy: userId, updatedBy: userId }, // 9
    //   { provinceId: 6, name: "ວຽງຄໍາ", createdBy: userId, updatedBy: userId }, // 10
    //   { provinceId: 6, name: "ພູຄູນ", createdBy: userId, updatedBy: userId }, // 11
    //   { provinceId: 6, name: "ໂພນທອງ", createdBy: userId, updatedBy: userId }, // 12
    //   // 7. ຫົວພັນ
    //   { provinceId: 7, name: "ຊໍາເໜືອ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 7, name: "ຊຽງຄໍ້", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 7, name: "ຮ້ຽມ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 7, name: "ວຽງໄຊ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 7, name: "ຫົວເມືອງ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 7, name: "ຊໍາໃຕ້", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 7, name: "ສົບເບົາ", createdBy: userId, updatedBy: userId }, // 7
    //   { provinceId: 7, name: "ແອດ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 7, name: "ກວັນ", createdBy: userId, updatedBy: userId }, // 9
    //   { provinceId: 7, name: "ຊ່ອນ", createdBy: userId, updatedBy: userId }, // 10
    //   // 8. ໄຊຍະບູລີ
    //   { provinceId: 8, name: "ໄຊຍະບູລີ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 8, name: "ຄອບ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 8, name: "ຫົງສາ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 8, name: "ເງິນ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 8, name: "ຊຽງຮ່ອນ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 8, name: "ພຽງ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 8, name: "ປາກອອກ", createdBy: userId, updatedBy: userId }, // 7
    //   { provinceId: 8, name: "ແກ່ນທ້າວ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 8, name: "ບໍ່ແຕນ", createdBy: userId, updatedBy: userId }, // 9
    //   { provinceId: 8, name: "ທົ່ງມີໄຊ", createdBy: userId, updatedBy: userId }, // 10
    //   { provinceId: 8, name: "ໄຊສະຖານ", createdBy: userId, updatedBy: userId }, // 11
    //   // 9. ຊຽງຂວາງ
    //   {
    //     provinceId: 9,
    //     name: "ແປກ (ໂພນສະຫວັນ)",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   { provinceId: 9, name: "ຄໍາ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 9, name: "ໜອງແຮດ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 9, name: "ຄູນ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 9, name: "ໝອກໃໝ່", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 9, name: "ພູກູດ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 9, name: "ຜາໄຊ", createdBy: userId, updatedBy: userId }, // 7
    //   // 10. ວຽງຈັນ
    //   { provinceId: 10, name: "ໂພນໂຮງ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 10, name: "ທຸລະຄົມ", createdBy: userId, updatedBy: userId }, // 2
    //   {
    //     provinceId: 10,
    //     name: "ແກ້ວອຸດົມ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 3
    //   { provinceId: 10, name: "ກາສີ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 10, name: "ວັງວຽງ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 10, name: "ເຟືອງ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 10, name: "ຊະນະຄາມ", createdBy: userId, updatedBy: userId }, // 7
    //   { provinceId: 10, name: "ແມດ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 10, name: "ຫີນເຫີບ", createdBy: userId, updatedBy: userId }, // 9
    //   { provinceId: 10, name: "ວຽງຄໍາ", createdBy: userId, updatedBy: userId }, // 10
    //   { provinceId: 10, name: "ໝື່ນ", createdBy: userId, updatedBy: userId }, // 11
    //   // 11. ບໍລິຄໍາໄຊ
    //   { provinceId: 11, name: "ປາກຊັນ", createdBy: userId, updatedBy: userId }, // 1
    //   {
    //     provinceId: 11,
    //     name: "ທ່າພະບາດ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   {
    //     provinceId: 11,
    //     name: "ປາກກະດິງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 3
    //   { provinceId: 11, name: "ບໍລິຄັນ", createdBy: userId, updatedBy: userId }, // 4
    //   {
    //     provinceId: 11,
    //     name: "ຄໍາເກີດ (ຫຼັກ 20)",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 5
    //   { provinceId: 11, name: "ວຽງທອງ", createdBy: userId, updatedBy: userId }, // 6
    //   {
    //     provinceId: 11,
    //     name: "ໄຊຈໍາພອນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   // 12. ຄໍາມ່ວນ
    //   { provinceId: 12, name: "ທ່າແຂກ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 12, name: "ມະຫາໄຊ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 12, name: "ໜອງບົກ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 12, name: "ຫີນບູນ", createdBy: userId, updatedBy: userId }, // 4
    //   {
    //     provinceId: 12,
    //     name: "ຍົມມະລາດ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 5
    //   { provinceId: 12, name: "ບົວລະພາ", createdBy: userId, updatedBy: userId }, // 6
    //   { provinceId: 12, name: "ນາກາຍ", createdBy: userId, updatedBy: userId }, // 7
    //   {
    //     provinceId: 12,
    //     name: "ເຊບັ້ງໄຟ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 8
    //   {
    //     provinceId: 12,
    //     name: "ໄຊບົວທອງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 9
    //   { provinceId: 12, name: "ຄູນຄໍາ", createdBy: userId, updatedBy: userId }, // 10
    //   // 13. ສະຫວັນນະເຂດ
    //   {
    //     provinceId: 13,
    //     name: "ນະຄອນໄກສອນ ພົມວິຫານ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   {
    //     provinceId: 13,
    //     name: "ອຸທົມພອນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   {
    //     provinceId: 13,
    //     name: "ອາດສະພັງທອງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 3
    //   { provinceId: 13, name: "ພິນ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 13, name: "ເຊໂປນ", createdBy: userId, updatedBy: userId }, // 5
    //   { provinceId: 13, name: "ນອງ", createdBy: userId, updatedBy: userId }, // 6
    //   {
    //     provinceId: 13,
    //     name: "ທ່າປາງທອງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   { provinceId: 13, name: "ສອງຄອນ", createdBy: userId, updatedBy: userId }, // 8
    //   { provinceId: 13, name: "ຈໍາພອນ", createdBy: userId, updatedBy: userId }, // 9
    //   {
    //     provinceId: 13,
    //     name: "ຊົນນະບູລີ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 10
    //   { provinceId: 13, name: "ໄຊບູລີ", createdBy: userId, updatedBy: userId }, // 11
    //   {
    //     provinceId: 13,
    //     name: "ວິລະບູລີ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 12
    //   {
    //     provinceId: 13,
    //     name: "ອາດສະພອນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 13
    //   { provinceId: 13, name: "ໄຊພູທອງ", createdBy: userId, updatedBy: userId }, // 14
    //   { provinceId: 13, name: "ພະລານໄຊ", createdBy: userId, updatedBy: userId }, // 15
    //   // 14. ສາລະວັນ
    //   { provinceId: 14, name: "ສາລະວັນ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 14, name: "ຕະໂອ້ຍ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 14, name: "ຕຸ້ມລານ", createdBy: userId, updatedBy: userId }, // 3
    //   {
    //     provinceId: 14,
    //     name: "ລະຄອນເພັງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 4
    //   { provinceId: 14, name: "ວາປີ", createdBy: userId, updatedBy: userId }, // 5
    //   {
    //     provinceId: 14,
    //     name: "ຄົງເຊໂດນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 6
    //   {
    //     provinceId: 14,
    //     name: "ເລົ່າງາມ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   { provinceId: 14, name: "ສະໝ້ວຍ", createdBy: userId, updatedBy: userId }, // 8
    //   // 15. ເຊກອງ
    //   { provinceId: 15, name: "ລະມາມ", createdBy: userId, updatedBy: userId }, // 1
    //   { provinceId: 15, name: "ກະລຶມ", createdBy: userId, updatedBy: userId }, // 2
    //   { provinceId: 15, name: "ດາກຈຶງ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 15, name: "ທ່າແຕງ", createdBy: userId, updatedBy: userId }, // 4
    //   // 16. ຈໍາປາສັກ
    //   {
    //     provinceId: 16,
    //     name: "ນະຄອນປາກເຊ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 1
    //   {
    //     provinceId: 16,
    //     name: "ຊະນະສົມບູນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   {
    //     provinceId: 16,
    //     name: "ບາຈຽງຈະເລີນສຸກ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 3
    //   { provinceId: 16, name: "ປາກຊ່ອງ", createdBy: userId, updatedBy: userId }, // 4
    //   {
    //     provinceId: 16,
    //     name: "ປະທຸມພອນ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 5
    //   { provinceId: 16, name: "ໂພນທອງ", createdBy: userId, updatedBy: userId }, // 6
    //   {
    //     provinceId: 16,
    //     name: "ຈໍາປາສັກ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 7
    //   { provinceId: 16, name: "ສຸຂຸມາ", createdBy: userId, updatedBy: userId }, // 8
    //   {
    //     provinceId: 16,
    //     name: "ມູນລະປະໂມກ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 9
    //   { provinceId: 16, name: "ໂຂງ", createdBy: userId, updatedBy: userId }, // 10
    //   // 17. ອັດຕະປື
    //   { provinceId: 17, name: "ໄຊເສດຖາ", createdBy: userId, updatedBy: userId }, // 1
    //   {
    //     provinceId: 17,
    //     name: "ສາມັກຄີໄຊ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   { provinceId: 17, name: "ສະໜາມໄຊ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 17, name: "ຊານໄຊ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 17, name: "ພູວົງ", createdBy: userId, updatedBy: userId }, // 5
    //   // 18. ໄຊສົມບູນ
    //   { provinceId: 18, name: "ອະນຸວົງ", createdBy: userId, updatedBy: userId }, // 1
    //   {
    //     provinceId: 18,
    //     name: "ລ້ອງແຈ້ງ",
    //     createdBy: userId,
    //     updatedBy: userId,
    //   }, // 2
    //   { provinceId: 18, name: "ລ້ອງຊານ", createdBy: userId, updatedBy: userId }, // 3
    //   { provinceId: 18, name: "ຮົ່ມ", createdBy: userId, updatedBy: userId }, // 4
    //   { provinceId: 18, name: "ທ່າໂທມ", createdBy: userId, updatedBy: userId }, // 5
    // ]);

    const t = await db.sequelize.transaction();

    try {
      let hashPassword = bcrypt.hashSync(password, 10);

      const user = await User.create(
        {
          id: userId,
          email,
          password: hashPassword,
        },
        { transaction: t }
      );

      await user.setRoles(roles, { transaction: t });

      await Profile.create(
        {
          userId: user.id,
          firstname,
          lastname,
          gender,
          phone,
          provinceId,
          districtId,
          village,
          createdBy: user.id,
          updatedBy: user.id,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(201).json({
        message: "ການເພີ່ມ Super Admin ສໍາເລັດ",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },
};
