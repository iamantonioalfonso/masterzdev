const Token = artifacts.require('Token');


module.exports = async function(deployer, network, accounts) {
  // Use deployer to state migration tasks.

  if (network === 'development') {
    const [ tokenOwner, user1, user2, user3 ] = accounts;

    const tokenContract = await deployer.deploy(Token, 'Homework1', 'HW1', 1_000_000);
    console.log('Deployer token is:', (await Token.deployed()).address);
  }

};
