//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}