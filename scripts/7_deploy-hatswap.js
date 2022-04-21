const hre = require("hardhat");
async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying HatSwap with the account:", deployer.address);

    // We get the contract to deploy
    const Hatswap = await hre.ethers.getContractFactory("HatSwap");
    const hatswap = await Hatswap.deploy(
        "https://hatswapcity.com/ipfs/"
    );

    await hatswap.deployed();
    console.log("Hatcoin deployed to:", hatswap.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
