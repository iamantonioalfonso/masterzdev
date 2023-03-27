const Token = artifacts.require('Token');
const Whitelist = artifacts.require('Whitelist');
const Blacklist = artifacts.require('Blacklist');


module.exports = async function(deployer, network, accounts) {
  // Use deployer to state migration tasks.

  // if (network === 'development') {
  //   const [ tokenOwner, user1, user2, user3 ] = accounts;

  //   const tokenContract = await deployer.deploy(Token, 'Homework1', 'HW1', 1_000_000);
  //   console.log('Deployer token is:', (await Token.deployed()).address);
  // }

  // console.log(deployer, network, accounts)
  if (network === 'development') {
    await deployer.deploy(Whitelist);
    const whitelistContract = await Whitelist.deployed();
    console.log('Deployer Whitelist Contract at', whitelistContract.address);

    await deployer.deploy(Blacklist);
    const blacklistContract = await Blacklist.deployed();
    console.log('Deployer Blacklist Contract at', blacklistContract.address);
    
    await deployer.deploy(
      Token, 
      'Homework1', 
      'HW1', 
      1_000_000, 
      whitelistContract.address, 
      blacklistContract.address
    );
    const tokenContract = await Token.deployed();
    console.log('Deployer token is:', tokenContract.address);
  }

};
