// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract KlayFarm is ERC721 {

    struct Item {
        string name;
        uint256 plantedAt;
    } 

    event Planted(uint256 indexed tokenId, uint256 indexed index, string name);
    event Harvested(uint256 indexed tokenId, uint256 indexed index, string name);

    // Those are currently hardcoded, this should be managed by admin
    uint256 public constant MAX_FARM = 9;
    uint256 public constant HARVEST_INTERVAL = 5 minutes;
    string public constant PLANT_NAME = "Tomato";

    mapping (uint256 => mapping(uint => Item)) public items;

    constructor() ERC721("KlayFarm", "KF") {}

    function mint() public {
        uint256 tokenId = getTokenIdByAddress(msg.sender);
        _mint(msg.sender, tokenId);
    }

    function plant(uint256 index) public {
        require(index < MAX_FARM, "KlayFarm: farm index must be less than MAX_FARM"); 
        uint256 tokenId = getTokenIdByAddress(msg.sender);
        Item memory currentItem =  items[tokenId][index];
        require(currentItem.plantedAt == 0, "KlayFarm: already planted");
        Item memory newItem =  Item(PLANT_NAME, block.timestamp);
        items[tokenId][index] = newItem;
        emit Planted(tokenId, index, newItem.name);
    }

    function harvest(uint256 index) public {
        require(index < MAX_FARM, "KlayFarm: farm index must be less than MAX_FARM");  
        uint256 tokenId = getTokenIdByAddress(msg.sender);
        Item memory currentItem =  items[tokenId][index];
        require(block.timestamp > currentItem.plantedAt + HARVEST_INTERVAL, "KlayFarm: not ready to harvest");
        delete items[tokenId][index];
        emit Harvested(tokenId, index, currentItem.name);
    }

    function getAllItems(uint256 tokenId) public view returns (Item[] memory) {
        Item[] memory _items = new Item[](MAX_FARM);
        for(uint256 i = 0; i < MAX_FARM; i++) {
            _items[i] = items[tokenId][i];
        }
        return _items;
    }

    function getTokenIdByAddress(address _address) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(msg.sender)));
    }

    function getMetaData(uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "query for nonexistent token");

        string memory name = "KlayFarm";
        string memory description = "This is KlayFarm";
        string memory image = "https://placehold.jp/500x500.png";
        string memory animationURL = "https://2023-klaymakers.vercel.app";

        return
            string(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    '","description":"',
                    description,
                    '","image":"',
                    image,
                    '","animation_url":"',
                    animationURL,
                    "?id=",
                    Strings.toString(_tokenId),
                    '"}'
                )
            );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override 
        returns (string memory)
    {
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(getMetaData(tokenId))
                )
            )
        );
    }
}
