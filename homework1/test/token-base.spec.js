const { BN, constants, web3 } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const { shouldBehaveLikeERC20 } = require('./ERC20.behavior');

const Token = artifacts.require('Token');
const Whitelist = artifacts.require('Whitelist');
const Blacklist = artifacts.require('Blacklist');

const { ZERO_ADDRESS } = constants;

const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());

// In JS test is suck! We need to declare a "token" variable with right scope for testing shouldBehaveLikeERC20
contract('Token Base', ([deployer, recipient, firstAccount, otherAccount]) => {
  
  beforeEach(async function () {
    this.whitelistContract = await Whitelist.new();
    await this.whitelistContract.add(recipient, { from: deployer });
    await this.whitelistContract.add(otherAccount, { from: deployer });

    this.blacklistContract = await Blacklist.new();
    
    this.token = await Token.new(
      'Homework1', 
      'HW1', 
      1_000_000, 
      this.whitelistContract.address, 
      this.blacklistContract.address
    );
  });

  shouldBehaveLikeERC20(
    'ERC20', 
    new BN('1000000000000000000000000'), // 1_000_000 * 10**18
    deployer,
    recipient,
    otherAccount
  );

}); 