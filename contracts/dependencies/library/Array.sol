//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

library Array {
    function fetchData(uint[] memory arr, uint cursor, uint howMany) internal pure returns (uint[] memory values, uint256 newCursor) {
        uint length = howMany;
        if (length > arr.length - cursor) {
            length = arr.length - cursor;
        }
        values = new uint[](length);
        for (uint i = 0; i < length; i++) {
            values[i] = arr[cursor + i];
        }
        return (values, cursor + length);
    }
}