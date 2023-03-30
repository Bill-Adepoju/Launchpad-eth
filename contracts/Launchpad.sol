// SPDX-License-Identifier: william

// deployed on goerli to 0x816f07A2dd36deF6296c337633f9097cad36D18c

pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// LaunchPad contract that allows users to deposit Ether and receive token B in return
contract LaunchPad is ERC20 {
    uint256 public startTime; // Start time of the launchpad
    uint256 public endTime; // End time of the launchpad
    address public owner; // Owner of the contract

    // Constructor that sets the initial state of the contract
    constructor(uint256 _startTime, uint256 _endTime) ERC20("TokenB", "TKB") {
        startTime = _startTime;
        endTime = _endTime;
        owner = msg.sender;
    }

    // Function that allows users to deposit Ether and receive token B in return
    function deposit() external payable {
        // Check that the launchpad is currently active
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Launchpad not active");

        // Calculate the amount of token B the user should receive
        uint256 tokenBAmount = getTokenBAmount(msg.value);

        // Mint token B for the user
        _mint(msg.sender, tokenBAmount);
    }

    // Function that allows users to withdraw their token B after the launchpad has ended
    function withdraw(uint256 amount) external {
        // Check that the launchpad has ended
        require(block.timestamp > endTime, "Launchpad still active");

        // Calculate the burn amount (0.005% of the withdrawal amount)
        uint256 burnAmount = (amount * 5) / 100000;

        // Burn the calculated amount of token B from the user's balance
        _burn(msg.sender, burnAmount);

        // Transfer the remaining token B to the user's address
        transfer(msg.sender, amount - burnAmount);
    }

    // Function that allows the owner to withdraw any deposited Ether from the contract
    function withdrawEther() external {
        // Check that the caller is the owner of the contract
        require(msg.sender == owner, "Only owner can withdraw Ether");

        // Transfer all Ether from the contract to the owner's address
        payable(owner).transfer(address(this).balance);
    }

    // Function that calculates the amount of token B a user should receive based on their deposit of Ether
    function getTokenBAmount(uint256 amount) public pure returns (uint256) {
        // Set a fixed 1:1 ratio between token B and Ether
        return amount;
    }
}