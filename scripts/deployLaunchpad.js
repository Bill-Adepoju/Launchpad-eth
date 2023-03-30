const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const LaunchPad = await hre.ethers.getContractFactory("LaunchPad");

  // Set the start and end times for the launchpad
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = startTime + 60 * 60; // 1 hour from now

  // Deploy the launchpad contract
  const launchPad = await LaunchPad.deploy(startTime, endTime);

  console.log("LaunchPad deployed to:", launchPad.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
