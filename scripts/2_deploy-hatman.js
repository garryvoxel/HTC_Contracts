const hre = require("hardhat");
async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // We get the contract to deploy
    const Hatman = await hre.ethers.getContractFactory("Hatman");
    const hatman = await Hatman.deploy(
        "0x9a7daCa7793Fe3A9F470Ad50EF938E29c8562ff1",  //token
        "0x6623251447ab7afeB0442Aa1Ed4D48FD6Eeb55Fa",  //signer
        "0x2A2c1b6f2Be8eD53626F1d0578EDb6010E9C52fe",  //depositPoolWallet
        "0xB4f175366754ea17dDdA73A96b476bAbfD18Ad5D",  //withdrawPoolWallet
        "0x9802280F6999b7a496b8d7B5772A9683756Fc706"   //rewardPoolWallet
    );

    await hatman.deployed();
    console.log("Hatman deployed to:", hatman.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
