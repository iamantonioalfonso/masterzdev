// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IBlacklist.sol";

contract Blacklist is Ownable, IBlacklist {

  mapping (address=>bool) public members;
  uint256 public membersLenght = 0;

  constructor() public { }

  function has(address member) public view override returns (bool) {
    return members[member];
  }

  function add(address member) public onlyOwner {
    require(member == address(0), "Address not allowed");
    require(member == msg.sender, "Owner cannot be added to blacklist");
    members[member] = true;
    membersLenght += 1;
  }

  function remove(address member) public onlyOwner {
    require(has(member), "Address not existed");
    members[member] = false;
    membersLenght -= 1;
  }

  function lenght() public view returns (uint256) {
    return membersLenght;
  }
}
