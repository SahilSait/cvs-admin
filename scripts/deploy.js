
const hre = require("hardhat");

async function main() {
  const Certification = await hre.ethers.getContractFactory("Certification");
  const certification = await Certification.deploy(
    "Roman",
    "MDL19CS098",
    "Certificate.pdf",
    "bafybeic5z5dguqbeatyys6vqjqka3bfx6vo3exlvrpo52u3leqsohd2kse"
  );
  await certification.deployed();
  console.log("Contract deployed to:", certification.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
