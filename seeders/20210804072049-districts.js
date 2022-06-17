"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('districts',
    //   [
    //     // 1. ນະຄອນຫຼວງວຽງຈັນ
    //     { province_id: 1, name: 'ຈັນທະບູລີ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 1, name: 'ສີໂຄດຕະບອງ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 1, name: 'ໄຊເສດຖາ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 1, name: 'ສີສັດຕະນາກ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 1, name: 'ນາຊາຍທອງ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 1, name: 'ໄຊທານີ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 1, name: 'ຫາດຊາຍຟອງ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 1, name: 'ສັງທອງ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 1, name: 'ປາກງື່ມ', created_by: 1, updated_by: 1 }, // 9
    //     // 2. ຜົ້ງສາລີ
    //     { province_id: 2, name: 'ຜົ້ງສາລີ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 2, name: 'ໃໝ່', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 2, name: 'ຂວາ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 2, name: 'ສໍາພັນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 2, name: 'ບຸນເໜືອ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 2, name: 'ຍອດອູ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 2, name: 'ບຸນໃຕ້', created_by: 1, updated_by: 1 }, // 7
    //     // 3. ຫຼວງນໍ້າທາ
    //     { province_id: 3, name: 'ຫຼວງນໍ້າທາ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 3, name: 'ສິງ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 3, name: 'ລອງ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 3, name: 'ວຽງພູຄໍາ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 3, name: 'ນາແລ', created_by: 1, updated_by: 1 }, // 5
    //     // 4. ອຸດົມໄຊ
    //     { province_id: 4, name: 'ໄຊ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 4, name: 'ຫຼາ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 4, name: 'ນາໝໍ້', created_by: 1, updated_by: 1 }, //3
    //     { province_id: 4, name: 'ງາ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 4, name: 'ແບງ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 4, name: 'ຮຸນ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 4, name: 'ປາກແບ່ງ', created_by: 1, updated_by: 1 }, // 7
    //     // 5. ບໍ່ແກ້ວ
    //     { province_id: 5, name: 'ຫ້ວຍຊາຍ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 5, name: 'ຕົ້ນເຜິ້ງ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 5, name: 'ເມິງ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 5, name: 'ຜາອຸດົມ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 5, name: 'ປາກທາ', created_by: 1, updated_by: 1 }, // 5
    //     // 6. ຫຼວງພະບາງ
    //     { province_id: 6, name: 'ນະຄອນຫຼວງພະບາງ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 6, name: 'ຊຽງເງິນ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 6, name: 'ນານ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 6, name: 'ປາກອູ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 6, name: 'ນໍ້າບາກ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 6, name: 'ງອຍ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 6, name: 'ປາກແຊງ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 6, name: 'ໂພນໄຊ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 6, name: 'ຈອມເພັດ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 6, name: 'ວຽງຄໍາ', created_by: 1, updated_by: 1 }, // 10
    //     { province_id: 6, name: 'ພູຄູນ', created_by: 1, updated_by: 1 }, // 11
    //     { province_id: 6, name: 'ໂພນທອງ', created_by: 1, updated_by: 1 }, // 12
    //     // 7. ຫົວພັນ
    //     { province_id: 7, name: 'ຊໍາເໜືອ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 7, name: 'ຊຽງຄໍ້', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 7, name: 'ຮ້ຽມ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 7, name: 'ວຽງໄຊ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 7, name: 'ຫົວເມືອງ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 7, name: 'ຊໍາໃຕ້', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 7, name: 'ສົບເບົາ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 7, name: 'ແອດ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 7, name: 'ກວັນ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 7, name: 'ຊ່ອນ', created_by: 1, updated_by: 1 }, // 10
    //     // 8. ໄຊຍະບູລີ
    //     { province_id: 8, name: 'ໄຊຍະບູລີ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 8, name: 'ຄອບ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 8, name: 'ຫົງສາ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 8, name: 'ເງິນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 8, name: 'ຊຽງຮ່ອນ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 8, name: 'ພຽງ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 8, name: 'ປາກອອກ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 8, name: 'ແກ່ນທ້າວ', created_by: 1, updated_by: 1 },// 8
    //     { province_id: 8, name: 'ບໍ່ແຕນ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 8, name: 'ທົ່ງມີໄຊ', created_by: 1, updated_by: 1 }, // 10
    //     { province_id: 8, name: 'ໄຊສະຖານ', created_by: 1, updated_by: 1 }, // 11
    //     // 9. ຊຽງຂວາງ
    //     { province_id: 9, name: 'ແປກ (ໂພນສະຫວັນ)', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 9, name: 'ຄໍາ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 9, name: 'ໜອງແຮດ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 9, name: 'ຄູນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 9, name: 'ໝອກໃໝ່', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 9, name: 'ພູກູດ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 9, name: 'ຜາໄຊ', created_by: 1, updated_by: 1 }, // 7
    //     // 10. ວຽງຈັນ
    //     { province_id: 10, name: 'ໂພນໂຮງ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 10, name: 'ທຸລະຄົມ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 10, name: 'ແກ້ວອຸດົມ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 10, name: 'ກາສີ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 10, name: 'ວັງວຽງ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 10, name: 'ເຟືອງ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 10, name: 'ຊະນະຄາມ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 10, name: 'ແມດ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 10, name: 'ຫີນເຫີບ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 10, name: 'ວຽງຄໍາ', created_by: 1, updated_by: 1 }, // 10
    //     { province_id: 10, name: 'ໝື່ນ', created_by: 1, updated_by: 1 }, // 11
    //     // 11. ບໍລິຄໍາໄຊ
    //     { province_id: 11, name: 'ປາກຊັນ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 11, name: 'ທ່າພະບາດ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 11, name: 'ປາກກະດິງ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 11, name: 'ບໍລິຄັນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 11, name: 'ຄໍາເກີດ (ຫຼັກ 20)', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 11, name: 'ວຽງທອງ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 11, name: 'ໄຊຈໍາພອນ', created_by: 1, updated_by: 1 }, // 7
    //     // 12. ຄໍາມ່ວນ
    //     { province_id: 12, name: 'ທ່າແຂກ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 12, name: 'ມະຫາໄຊ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 12, name: 'ໜອງບົກ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 12, name: 'ຫີນບູນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 12, name: 'ຍົມມະລາດ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 12, name: 'ບົວລະພາ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 12, name: 'ນາກາຍ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 12, name: 'ເຊບັ້ງໄຟ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 12, name: 'ໄຊບົວທອງ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 12, name: 'ຄູນຄໍາ', created_by: 1, updated_by: 1 }, // 10
    //     // 13. ສະຫວັນນະເຂດ
    //     { province_id: 13, name: 'ນະຄອນໄກສອນ ພົມວິຫານ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 13, name: 'ອຸທົມພອນ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 13, name: 'ອາດສະພັງທອງ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 13, name: 'ພິນ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 13, name: 'ເຊໂປນ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 13, name: 'ນອງ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 13, name: 'ທ່າປາງທອງ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 13, name: 'ສອງຄອນ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 13, name: 'ຈໍາພອນ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 13, name: 'ຊົນນະບູລີ', created_by: 1, updated_by: 1 }, // 10
    //     { province_id: 13, name: 'ໄຊບູລີ', created_by: 1, updated_by: 1 }, // 11
    //     { province_id: 13, name: 'ວິລະບູລີ', created_by: 1, updated_by: 1 }, // 12
    //     { province_id: 13, name: 'ອາດສະພອນ', created_by: 1, updated_by: 1 }, // 13
    //     { province_id: 13, name: 'ໄຊພູທອງ', created_by: 1, updated_by: 1 }, // 14
    //     { province_id: 13, name: 'ພະລານໄຊ', created_by: 1, updated_by: 1 }, // 15
    //     // 14. ສາລະວັນ
    //     { province_id: 14, name: 'ສາລະວັນ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 14, name: 'ຕະໂອ້ຍ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 14, name: 'ຕຸ້ມລານ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 14, name: 'ລະຄອນເພັງ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 14, name: 'ວາປີ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 14, name: 'ຄົງເຊໂດນ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 14, name: 'ເລົ່າງາມ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 14, name: 'ສະໝ້ວຍ', created_by: 1, updated_by: 1 }, // 8
    //     // 15. ເຊກອງ
    //     { province_id: 15, name: 'ລະມາມ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 15, name: 'ກະລຶມ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 15, name: 'ດາກຈຶງ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 15, name: 'ທ່າແຕງ', created_by: 1, updated_by: 1 }, // 4
    //     // 16. ຈໍາປາສັກ
    //     { province_id: 16, name: 'ນະຄອນປາກເຊ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 16, name: 'ຊະນະສົມບູນ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 16, name: 'ບາຈຽງຈະເລີນສຸກ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 16, name: 'ປາກຊ່ອງ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 16, name: 'ປະທຸມພອນ', created_by: 1, updated_by: 1 }, // 5
    //     { province_id: 16, name: 'ໂພນທອງ', created_by: 1, updated_by: 1 }, // 6
    //     { province_id: 16, name: 'ຈໍາປາສັກ', created_by: 1, updated_by: 1 }, // 7
    //     { province_id: 16, name: 'ສຸຂຸມາ', created_by: 1, updated_by: 1 }, // 8
    //     { province_id: 16, name: 'ມູນລະປະໂມກ', created_by: 1, updated_by: 1 }, // 9
    //     { province_id: 16, name: 'ໂຂງ', created_by: 1, updated_by: 1 }, // 10
    //     // 17. ອັດຕະປື
    //     { province_id: 17, name: 'ໄຊເສດຖາ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 17, name: 'ສາມັກຄີໄຊ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 17, name: 'ສະໜາມໄຊ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 17, name: 'ຊານໄຊ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 17, name: 'ພູວົງ', created_by: 1, updated_by: 1 }, // 5
    //     // 18. ໄຊສົມບູນ
    //     { province_id: 18, name: 'ອະນຸວົງ', created_by: 1, updated_by: 1 }, // 1
    //     { province_id: 18, name: 'ລ້ອງແຈ້ງ', created_by: 1, updated_by: 1 }, // 2
    //     { province_id: 18, name: 'ລ້ອງຊານ', created_by: 1, updated_by: 1 }, // 3
    //     { province_id: 18, name: 'ຮົ່ມ', created_by: 1, updated_by: 1 }, // 4
    //     { province_id: 18, name: 'ທ່າໂທມ', created_by: 1, updated_by: 1 }, // 5
    //   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('districts', null, {});
  },
};
