// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./ERC721Mintable.sol";

interface IZokratesVerifier {
    function verifyTx(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external view returns (bool result);
}

contract SolnSquareVerifier is UdacityRealStateItem {
    struct Solution {
        address addr;
        uint256 index;
    }
    Solution[] solutions;
    //  define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) uniqueSolutions;

    event SolutionAdded(address addr, uint256 index);

    IZokratesVerifier verifier;

    constructor(address contractAddress) {
        verifier = IZokratesVerifier(contractAddress);
    }

    function addSolution(address _addr, uint256 tokenId) public {
        solutions.push(Solution(_addr, tokenId));
        uniqueSolutions[tokenId] = Solution(_addr, tokenId);

        emit SolutionAdded(_addr, tokenId);
    }

    function mintNFT(
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        //  - make sure the solution is unique (has not been used before)
        require(
            uniqueSolutions[tokenId].addr == address(0),
            "Solution is not unique."
        );
        // mint new NFT only after the solution has been verified
        verifier.verifyTx(a, b, c, input);
        // require(
        // verifier.verifyTx(a, b, c, input),
        // "Verfication Failed. Cant mint new token."
        // );

        addSolution(msg.sender, tokenId);
        _mint(msg.sender, tokenId);
    }
}
