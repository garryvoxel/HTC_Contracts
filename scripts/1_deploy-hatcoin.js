const hre = require("hardhat");
async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // We get the contract to deploy
    const Hatcoin = await hre.ethers.getContractFactory("HatCoin");
    const hatcoin = await Hatcoin.deploy(
        "0x500A1a96369F7D57Fed2117Ce046fBe8b373f017",
        "0x17E11f8D47c006d5Ad88E9193ADD3197FDBAC3e7",
        "0x588D83E1a2CE7C3D859e06AFc0e98e1D20CC6473",
        "0x9802280F6999b7a496b8d7B5772A9683756Fc706"
    );

    await hatcoin.deployed();
    console.log("Hatcoin deployed to:", hatcoin.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
