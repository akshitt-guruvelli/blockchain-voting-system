var SimpleStorage = artifacts.require("./stoken.sol");
var voter = artifacts.require("./election.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(voter );
};
