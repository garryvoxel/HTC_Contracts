const hre = require("hardhat");

function getBigNumber(value) {
    return hre.ethers.utils.parseUnits(value.toString(), 9);
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    const Hatcoin = await hre.ethers.getContractFactory("HatCoin");
    const address = '0x2bbdE7a30C5277c3cDB0f12B2467aDaF48BA91B7';   

    const hatcoin = await Hatcoin.attach(address);

    await hatcoin.connect(deployer).approve("0x6400358C889d389956FCf64D9621E491f4a2AD26", getBigNumber(8000000));
    console.log("done=========>");   
    // console.log("bigNumber: ", getBigNumber(2000));
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});