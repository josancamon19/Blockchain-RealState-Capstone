// migrating the appropriate contracts
// var UdacityRealStateItem = artifacts.require("./UdacityRealStateItem.sol");
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer) {
  // deployer.deploy(UdacityRealStateItem);
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};