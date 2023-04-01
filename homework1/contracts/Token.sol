// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IWhitelist.sol";
import "./interfaces/IBlacklist.sol";


contract Token is ERC20, Ownable {
    
  address private whitelistAddress;
  address private blacklistAddress;

  constructor(
    string memory name,
    string memory symbol,
    uint256 supply,
    address _whitelistAddress,
    address _blacklistAddress
  ) ERC20(name, symbol) {
    require(_whitelistAddress != address(0), "Address not allowed");
    whitelistAddress = _whitelistAddress;

    require(_blacklistAddress != address(0), "Address not allowed");
    blacklistAddress = _blacklistAddress;

    _mint(msg.sender, supply * (10 ** decimals()));
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
    require(to != address(0), "Tokens cannot be send at Zero address");
    require(IWhitelist(whitelistAddress).has(to) == true, "Whitelist: Receiver not allower");
    require(IBlacklist(blacklistAddress).has(to) == false, "Blacklist: Receiver not allower");

    super._beforeTokenTransfer(from, to, amount);
  }

  function setWhitelistContract(address contractAddress) public onlyOwner {
    require(contractAddress != address(0), "Address not allowed");
    whitelistAddress = contractAddress;
  }

  function setBlacklistContract(address contractAddress) public onlyOwner {
    require(contractAddress != address(0), "Address not allowed");
    blacklistAddress = contractAddress;
  }

  function getWhitelistContract() external view returns (address) {
    return whitelistAddress;
  }

  function getBlacklistContract() external view returns (address) {
    return blacklistAddress;
  }
}
