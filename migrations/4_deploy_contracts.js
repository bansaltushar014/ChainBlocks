var Chainbooks = artifacts.require("./Chainbooks.sol");

module.exports = function(deployer) {
  deployer.deploy(Chainbooks);
};

