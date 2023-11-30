// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract KlayFarm is ERC721, Ownable {
    constructor() ERC721("KlayFarm", "KF") {}

    function mint(address _to, uint256 _tokenId) public onlyOwner {
        _safeMint(_to, _tokenId);
    }

    function getMetaData(uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "query for nonexistent token");

        string memory name = "KlayFarm";
        string memory description = "This is KlayFarm";
        string memory image = "https://placehold.jp/500x500.png";
        string memory animationURL = "https://2023-klaymakers.vercel.app?id=0";

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
