const signup = require("./signup");
const signin = require("./signin");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSub = require("./updateSub");
const avatarUpload = require("./avatarUpload");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");
module.exports = {
  signup,
  signin,
  getCurrent,
  logout,
  updateSub,
  avatarUpload,
  verifyEmail,
  resendEmail,
};
