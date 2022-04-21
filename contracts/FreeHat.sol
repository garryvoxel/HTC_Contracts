//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "./dependencies/HatERC1155BaseUpgradeable.sol";
import "./dependencies/library/Array.sol";
import "./dependencies/library/Strings.sol";

interface IFreeHatCollection {
    event TokenTypeAdded(uint256 lastTokenID);
    function addTokenTypes(uint256 numOfTokenTypes) external;
    function setTokenURI(uint256 _tokenID, string memory _tokenURI) external;
    function tokensOfOwner(address _owner, uint256 _cursor, uint256 _howMany) external view returns(uint256[] memory, uint256);
    function giveawayHats(uint256 _tokenID, address[] memory _users) external;
    function mintHats(address _to, uint256[] memory _tokenIDs, uint256[] memory _amounts) external;
}

contract FreeHatCollection is IFreeHatCollection, HatERC1155BaseUpgradeable {
    using Array for uint256[];
    using Strings for uint256;

    uint256 private maxTokenID;
    mapping (uint256 => string) private tokenURIs;

    string public name;
    string public symbol;

    function initialize(string memory baseURI, string memory name_, string memory symbol_) public initializer {
        __ERC1155_init(baseURI);

        name = name_;
        symbol = symbol_;
    }

    modifier tokenIDExists(uint256 _tokenID) {
        require(_tokenID <= maxTokenID, "FreeHatCollection: NONEXISTENT_TOKEN");
        _;
    }

    modifier tokenIDArrayValidate(uint256[] memory _tokenIDs) {
        for(uint256 i = 0; i < _tokenIDs.length; i ++) {
            require(_tokenIDs[i] <= maxTokenID, "FreeHatCollection: NONEXISTENT_TOKEN");
        }
        _;
    }

    function addTokenTypes(uint256 numOfTokenTypes) public override isTrusted whenNotPaused {
        require(numOfTokenTypes > 0);
        maxTokenID = maxTokenID + numOfTokenTypes;
        emit TokenTypeAdded(maxTokenID);
    }

    function setTokenURI(
        uint256 _tokenID, string memory _tokenURI
    ) public override isTrusted whenNotPaused tokenIDExists(_tokenID) {
        tokenURIs[_tokenID] = _tokenURI;
    }

    function uri(
        uint256 _tokenID
    ) public view virtual override tokenIDExists(_tokenID) returns (string memory) {
        string memory _tokenURI = tokenURIs[_tokenID]; 
        string memory base = HatERC1155BaseUpgradeable.uri(_tokenID);

        if(bytes(_tokenURI).length > 0) {
            return _tokenURI;
        }

        return string(abi.encodePacked(base, _tokenID.toString()));
    }

    function tokensOfOwner(address _owner, uint256 _cursor, uint256 _howMany) public view override returns (uint256[] memory, uint256) {
        if(maxTokenID < 1) {
            return (new uint256[](0), 0);
        }
        address[] memory addresses = new address[](maxTokenID);
        uint256[] memory registeredTokens = new uint256[](maxTokenID);

        for (uint256 _id = 1; _id <= maxTokenID; _id++) {
            addresses[_id - 1] = _owner;
            registeredTokens[_id - 1] = _id;
        }
        return balanceOfBatch(addresses, registeredTokens).fetchData(_cursor, _howMany);
    }

    function giveawayHats(
        uint256 _tokenID, address[] memory _users
    ) public override isTrusted whenNotPaused tokenIDExists(_tokenID) {
        _mint(_msgSender(), _tokenID, _users.length, "");
        for(uint256 i = 0; i < _users.length; i ++) {
            _safeTransferFrom(_msgSender(), _users[i], _tokenID, 1, "");
        }
    }

    function mintHats(
        address _to, uint256[] memory _tokenIDs, uint256[] memory _amounts
    ) public override isTrusted whenNotPaused tokenIDArrayValidate(_tokenIDs) {
        _mintBatch(_to, _tokenIDs, _amounts, "");
    }
}