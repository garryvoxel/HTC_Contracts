const hre = require("hardhat");

function getBigNumber(value) {
    return hre.ethers.utils.parseUnits(value.toString(), 9);
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    let privateKey = "b24e63c36d81f9a35f6062aa2b8ff85425f597b0cfa91a69c16ce3f995722b92";
    let wallet = new hre.ethers.Wallet(privateKey);

    const Hatman = await hre.ethers.getContractFactory("Hatman");
    const address = '0x6400358C889d389956FCf64D9621E491f4a2AD26';   

    const hatman = await Hatman.attach(address);

    const domain = {
        name: 'Hatman',
        version: '1',
        chainId: 4,
        verifyingContract: '0x6400358C889d389956FCf64D9621E491f4a2AD26'
    };

    const types = {
        Hatman: [
            {name: "account", type: "address"},  
            {name: "amount", type: "uint256"},
            {name: "credit", type: "uint256"},
            {name: "nonce", type: "uint256"},
            {name: "deadline", type: "uint256"},
          ]
    };

    const value = {
        account: deployer.address,
        amount: getBigNumber(3000),
        credit: 0,
        nonce: 1,
        deadline: 1685499796 
    };   
    signature = await wallet._signTypedData(domain, types, value);
    const { r, s, v } = ethers.utils.splitSignature(signature);    

    // console.log("aaaaaaaaaaa:", r, s, v, wallet.address);
    await hatman.connect(deployer).deposit(getBigNumber(3000), 1685499796, v, r, s);
    console.log("done========>");
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});