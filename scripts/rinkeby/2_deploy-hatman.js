const hre = require("hardhat");
async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // We get the contract to deploy
    const Hatman = await hre.ethers.getContractFactory("Hatman");
    const hatman = await Hatman.deploy(
        "0x2bbdE7a30C5277c3cDB0f12B2467aDaF48BA91B7",  //token
        "0x6623251447ab7afeB0442Aa1Ed4D48FD6Eeb55Fa",  //signer
        "0x500A1a96369F7D57Fed2117Ce046fBe8b373f017",  //depositPoolWallet
        "0x17E11f8D47c006d5Ad88E9193ADD3197FDBAC3e7"  //withdrawPoolWallet
    );
    
    // 0x500A1a96369F7D57Fed2117Ce046fBe8b373f017       (depositPoolWallet)
    // 0x17E11f8D47c006d5Ad88E9193ADD3197FDBAC3e7       (withdrawPoolWallet)
        // 0x9802280F6999b7a496b8d7B5772A9683756Fc706   user 
    await hatman.deployed();
    console.log("Hatman deployed to:", hatman.address);
}

main()
.then(() => process.exit(0))
.catch((error) => { 
    console.error(error);
    process.exit(1);
});
