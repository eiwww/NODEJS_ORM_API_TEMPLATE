module.exports = {
  getRandomString(length) {
    var randomChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  },
};
