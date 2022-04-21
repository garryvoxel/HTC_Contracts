//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "./ContextUpgradeable.sol";

contract Trustable is Initializable, ContextUpgradeable {
    
    address private _owner;
    mapping (address => bool) private _isTrusted;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function __Trustable_init() internal onlyInitializing {
        __Context_init_unchained();
        __Trustable_init_unchained();       
    }

    function __Trustable_init_unchained() internal onlyInitializing {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Caller is not the owner");
        _;
    }

    modifier isTrusted {
        require(_isTrusted[msg.sender] == true || _owner == msg.sender, "Caller is not trusted");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        _owner = newOwner;
    }

    function addTrusted(address user) public onlyOwner {
        _isTrusted[user] = true;
    }

    function removeTrusted(address user) public onlyOwner {
        _isTrusted[user] = false;
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    uint256[48] private __gap;
}

contract Pausable is Trustable {
    bool private _paused;
    
    event Pause(address account);
    event Unpause(address account);

    function __Pausable_init() internal onlyInitializing {
        __Trustable_init();
        __Pausable_init_unchained();
    }

    function __Pausable_init_unchained() internal onlyInitializing {
        _paused = false;
    }

    function paused() public view virtual returns (bool) {
        return _paused;
    }

    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;       
    }

    function pause() onlyOwner whenNotPaused public {
        _paused = true;
        emit Pause(_msgSender());
    }

    function unpause() onlyOwner whenPaused public {
        _paused = false;
        emit Unpause(_msgSender());
    }
    uint256[49] private __gap;   
}