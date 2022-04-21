//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "./interface/IERC165.sol";
import "./Initializable.sol";

abstract contract ERC165Upgradeable is Initializable, IERC165 {
    function __ERC165_init() internal onlyInitializing {
        __ERC165_init_unchained();       
    }

    function __ERC165_init_unchained() internal onlyInitializing {
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
    uint256[50] private __gap;      
}