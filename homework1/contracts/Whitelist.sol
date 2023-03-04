// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IWhitelist.sol";

contract Whitelist is Ownable, IWhitelist {

  mapping (address=>bool) public members;
  uint256 public membersLenght = 0;

  constructor() public { 
    add(msg.sender);
  }

  function has(address member) public view override returns (bool) {
    return members[member];
  }

  function add(address member) public onlyOwner {
    require(member == address(0), "Address not allowed");
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
