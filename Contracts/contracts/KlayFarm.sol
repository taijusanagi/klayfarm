// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KlayFarm is ERC721, Ownable {
    constructor() ERC721("KlayFarm", "KF") {}

    function mint(address _to, uint256 _tokenId) public onlyOwner {
        _safeMint(_to, _tokenId);
    }

    function getMetaData(uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "query for nonexistent token");

        string memory name = "KlayFarm";
        string memory description = "KlayFarm";
        string memory animationURL = "https://2023-klaymakers.vercel.app";

        return
            string(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    '","description":"',
                    description,
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
        return getMetaData(tokenId);
    }
}
