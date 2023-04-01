const { BN, constants } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect } = require('chai');

const { shouldBehaveLikeERC20 } = require('./ERC20.behavior');

const Token = artifacts.require('Token');
const Whitelist = artifacts.require('Whitelist');
const Blacklist = artifacts.require('Blacklist');

const { ZERO_ADDRESS } = constants;

const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());

// In JS test is suck! We need to declare a "token" variable with right scope for testing shouldBehaveLikeERC20
contract('Token', ([deployer, recipient, firstAccount, otherAccount]) => {
  
  it('retrieve deployer contract', async function () {
    this.whitelistContract = await Whitelist.deployed();
    expect(this.whitelistContract.address).to.be.not.equal(ZERO_ADDRESS);
    expect(this.whitelistContract.address).to.match(/0x[0-9a-fA-F]{40}/);

    this.blacklistContract = await Blacklist.deployed();
    expect(this.blacklistContract.address).to.be.not.equal(ZERO_ADDRESS);
    expect(this.blacklistContract.address).to.match(/0x[0-9a-fA-F]{40}/);
    
    this.token = await Token.deployed();
    expect(this.token.address).to.be.not.equal(ZERO_ADDRESS);
    expect(this.token.address).to.match(/0x[0-9a-fA-F]{40}/);
  });

  it('put accounts in whitelist (deployer)', async function() {
    await this.whitelistContract.add(recipient, { from: deployer });
    await this.whitelistContract.add(otherAccount, { from: deployer });
  });

  it('transfer some token from deployer account to others', async function() {
    await this.token.transfer(recipient, toWei(200_000), { from: deployer });
    await this.token.transfer(otherAccount, toWei(100_000), { from: deployer });


    const deployerBalance = await this.token.balanceOf(deployer);
    const recipientBalance = await this.token.balanceOf(recipient);
    const otherAccountBalance = await this.token.balanceOf(otherAccount);

    expect(deployerBalance.toString()).to.be.equal(toWei(700_000).toString());
    expect(recipientBalance.toString()).to.be.equal(toWei(200_000).toString());
    expect(otherAccountBalance.toString()).to.be.equal(toWei(100_000).toString());
  });
  
  it('owner change the white and black lists addresses', async function() {
    await this.token.setWhitelistContract(this.whitelistContract.address);
    await this.token.setBlacklistContract(this.blacklistContract.address);
    
    expect(await this.token.getWhitelistContract()).to.be.equal(this.whitelistContract.address);
    expect(await this.token.getBlacklistContract()).to.be.equal(this.blacklistContract.address);
  });

}); 