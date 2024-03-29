// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IWhitelist {
  function has(address member) external view returns (bool);
  function lenght() external view returns (uint256);
}