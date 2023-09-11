

module.exports = function () {
  if (!process.env.JWT_PRIVATE_KEY) {
    console.log("FATAL ERROR: jwt private key is not defined");
    process.exit(1);
  }
};
