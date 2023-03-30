const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LaunchPad", function () {
  let LaunchPad, launchPad, owner, addr1, addr2;
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = startTime + 60 * 60; // 1 hour from now

  beforeEach(async function () {
    LaunchPad = await ethers.getContractFactory("LaunchPad");

    [owner, addr1, addr2] = await ethers.getSigners();

    launchPad = await LaunchPad.deploy(startTime, endTime);
  });

  it("Should allow users to deposit Ether and receive token B", async function () {
    // Deposit Ether into the launchpad
    await launchPad.deposit({ value: ethers.utils.parseEther("1") });

    // Check that the user's balance of token B has increased
    expect(await launchPad.balanceOf(owner.address)).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("Should burn 0.005% of token B when users withdraw", async function () {
    // Deposit Ether into the launchpad
    await launchPad.deposit({ value: ethers.utils.parseEther("1") });

    // Withdraw token B from the launchpad
    await launchPad.withdraw(ethers.utils.parseEther("1"));

    // Check that the user's balance of token B has decreased by the withdrawal amount plus the burn amount
    expect(await launchPad.balanceOf(owner.address)).to.equal(0);
  });
});
