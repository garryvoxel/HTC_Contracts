const hre = require("hardhat");

function getBigNumber(value) {
    return hre.ethers.utils.parseUnits(value.toString(), 9);
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    const Hatcoin = await hre.ethers.getContractFactory("HatCoin");
    const address = '0x9a7daCa7793Fe3A9F470Ad50EF938E29c8562ff1';   

    const hatcoin = await Hatcoin.attach(address);

    await hatcoin.connect(deployer).approve("0x8666C762893780Cffc9F3552103DFbD43253d495", getBigNumber(200000));
    console.log("done=========>");   
    // console.log("bigNumber: ", getBigNumber(2000));
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});